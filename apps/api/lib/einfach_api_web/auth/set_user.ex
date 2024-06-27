defmodule EinfachApiWeb.Auth.SetUser do
  import Plug.Conn
  alias EinfachApiWeb.Auth.ErrorResponse
  alias EinfachApi.Users

  def init(_opts) do
  end

  def call(conn, _opts) do
    if conn.assigns[:user] do
      conn
    else
      user_id = get_session(conn, :user_id)

      if user_id == nil, do: raise(ErrorResponse.Unauthorized)

      user = Users.get_user!(user_id)

      cond do
        user_id && user -> assign(conn, :user, user)
        true -> assign(conn, :user, nil)
      end
    end
  end
end
