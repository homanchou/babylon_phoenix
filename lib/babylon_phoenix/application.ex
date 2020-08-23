defmodule BabylonPhoenix.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      BabylonPhoenix.Repo,
      # Start the Telemetry supervisor
      BabylonPhoenixWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: BabylonPhoenix.PubSub},
      # Start the Endpoint (http/https)
      BabylonPhoenixWeb.Endpoint,
      # Use registry
      {Registry, keys: :unique, name: BabylonPhoenix.RoomRegistry}
      # Start a worker by calling: BabylonPhoenix.Worker.start_link(arg)
      # {BabylonPhoenix.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: BabylonPhoenix.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    BabylonPhoenixWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
