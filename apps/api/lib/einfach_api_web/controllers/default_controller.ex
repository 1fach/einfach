defmodule EinfachApiWeb.DefaultController do
  use EinfachApiWeb, :controller

  def index(conn, _params) do
    send_resp(conn, 200, "Welcome to Einfach API - #{Mix.env()}")
  end
end
