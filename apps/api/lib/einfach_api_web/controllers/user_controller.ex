defmodule EinfachApiWeb.UserController do
  use EinfachApiWeb, :controller

  alias EinfachApiWeb.{Auth.Guardian, Auth.ErrorResponse}
  alias EinfachApi.{Users, Users.User}

  import EinfachApiWeb.Auth.AuthorizedPlug

  plug :is_authorized when action in [:update, :delete]

  action_fallback EinfachApiWeb.FallbackController

  def index(conn, _params) do
    user = Users.list_user()
    render(conn, :index, user: user)
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_full_user(id)
    render(conn, :full_user, user: user)
  end

  def current_user(conn, %{}) do
    user = conn.assigns[:user]

    conn
    |> put_status(:ok)
    |> render(:show, user: user)
  end

  def update(_conn, %{"user" => _user_params}),
    do:
      raise(ErrorResponse.Unauthorized, message: "Password has to be provided to update an user.")

  def update(conn, %{"password" => password, "user" => user_params}) do
    user = conn.assigns[:user]

    case Guardian.validate_password(password, user.hashed_password) do
      true ->
        {:ok, user} = Users.update_user(user, user_params)
        render(conn, :show, user: user)

      false ->
        raise ErrorResponse.Unauthorized, message: "Password is incorrect."
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
