# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :einfach_api,
  ecto_repos: [EinfachApi.Repo],
  generators: [timestamp_type: :utc_datetime, binary_id: true]

# Configures the endpoint
config :einfach_api, EinfachApiWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [json: EinfachApiWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: EinfachApi.PubSub,
  live_view: [signing_salt: "i1Es7GtG"]

# Configures the Guardian
config :einfach_api, EinfachApiWeb.Auth.Guardian,
  issuer: "einfach_api",
  secret_key: "hGdEYAj1zbkIRn04PfR4Jt8HHkkfGYYxc8TIoW/0gycTwjCPollyXJHB9u9h32KF"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Configures the guardian db
config :guardian, Guardian.DB,
  repo: EinfachApi.Repo,
  schema_name: "guardian_tokens",
  sweep_interval: 60

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
