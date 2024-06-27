defmodule EinfachApiWeb.AuthJSON do
  def user_token(%{user: user, token: token}) do
    %{
      data: %{
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }
    }
  end
end
