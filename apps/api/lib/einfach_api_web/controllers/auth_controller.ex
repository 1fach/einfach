defmodule EinfachApiWeb.AuthController do
  use EinfachApiWeb, :controller
  alias EinfachApiWeb.{Auth.Guardian, Auth.ErrorResponse}
  alias EinfachApi.{Budgets, Budgets.Budget, Users, Users.User}

  action_fallback EinfachApiWeb.FallbackController

  def register(conn, %{"user" => user_params}) do
    new_user_params =
      user_params
      |> Map.put("hashed_password", Map.get(user_params, "password"))
      |> Map.delete("password")

    with {:ok, %User{} = user} <- Users.create_user(new_user_params),
         {:ok, %Budget{} = _budget} <- Budgets.create_budget(user, %{name: "My Budget"}) do
      authorize_user(conn, user.email, user_params["password"])
    end
  end

  def login(conn, %{"email" => email, "hashed_password" => hashed_password}) do
    authorize_user(conn, email, hashed_password)
  end

  defp authorize_user(conn, email, hashed_password) do
    case Guardian.authenticate(email, hashed_password) do
      {:ok, user, token} ->
        conn
        |> put_session(:user_id, user.id)
        |> put_status(:ok)
        |> render(:user_token, %{user: user, token: token})

      {:error, :unauthorized} ->
        raise ErrorResponse.Unauthorized, message: "Email or password is incorrect."
    end
  end

  def refresh_session(conn, %{}) do
    old_token = Guardian.Plug.current_token(conn)
    {:ok, user, new_token} = Guardian.authenticate(old_token)

    conn
    |> put_session(:user_id, user.id)
    |> put_status(:ok)
    |> render(:user_token, %{user: user, token: new_token})
  end

  def logout(conn, %{}) do
    user = conn.assigns[:user]
    token = Guardian.Plug.current_token(conn)
    Guardian.revoke(token)

    conn
    |> clear_session()
    |> put_status(:ok)
    |> render(:user_token, %{user: user, token: nil})
  end
end
