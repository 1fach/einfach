defmodule EinfachApiWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :einfach_api,
    module: EinfachApiWeb.Auth.Guardian,
    error_handler: EinfachApiWeb.Auth.GuardianErrorHandler

  plug Guardian.Plug.VerifySession
  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
