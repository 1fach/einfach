defmodule EinfachApiWeb.Router do
  use EinfachApiWeb, :router
  use Plug.ErrorHandler

  def handle_errors(conn, %{reason: %Phoenix.Router.NoRouteError{message: message}}) do
    conn
    |> json(%{errors: message})
    |> halt()
  end

  def handle_errors(conn, %{reason: %{message: message}}) do
    conn
    |> json(%{errors: message})
    |> halt()
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :put_secure_browser_headers
  end

  pipeline :auth do
    plug EinfachApiWeb.Auth.Pipeline
    plug EinfachApiWeb.Auth.SetUser
  end

  scope "/api", EinfachApiWeb do
    pipe_through :api

    get "/", DefaultController, :index
    post "/auth/register", AuthController, :register
    post "/auth/login", AuthController, :login
  end

  scope "/api", EinfachApiWeb do
    pipe_through [:api, :auth]

    get "/auth/logout", AuthController, :logout
    get "/auth/refresh", AuthController, :refresh_session

    get "/users/me", UserController, :current_user
    get "/users/:id", UserController, :show
    patch "/users/:id", UserController, :update
  end
end
