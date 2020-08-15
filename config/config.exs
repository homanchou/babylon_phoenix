# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :babylon_phoenix,
  ecto_repos: [BabylonPhoenix.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :babylon_phoenix, BabylonPhoenixWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "72PNhru0SpEP4OAZD4mD/W8lAly6sm+q2DldsbNpgbL/fZM85kfrGt8M8upKsEBP",
  render_errors: [view: BabylonPhoenixWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: BabylonPhoenix.PubSub,
  live_view: [signing_salt: "eF4sPOqu"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
