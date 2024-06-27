defmodule EinfachApiWeb.Auth.AuthorizedPlug do
  alias EinfachApiWeb.Auth.ErrorResponse

  def is_authorized(%{params: %{"id" => id}} = conn, _opts) do
    if id == conn.assigns[:user].id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end
end
