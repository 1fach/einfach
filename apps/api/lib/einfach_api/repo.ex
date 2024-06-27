defmodule EinfachApi.Repo do
  use Ecto.Repo,
    otp_app: :einfach_api,
    adapter: Ecto.Adapters.Postgres
end
