defmodule BabylonPhoenix.Repo do
  use Ecto.Repo,
    otp_app: :babylon_phoenix,
    adapter: Ecto.Adapters.Postgres
end
