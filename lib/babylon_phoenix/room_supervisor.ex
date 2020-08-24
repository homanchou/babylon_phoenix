defmodule BabylonPhoenix.RoomSupervisor do
  use DynamicSupervisor

  alias BabylonPhoenix.RoomServer

  def start_link(_arg) do
    DynamicSupervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  @doc """
  Starts a `GameServer` process and supervises it.
  """
  def create_room(room_id) do
    DynamicSupervisor.start_child(__MODULE__, {RoomServer, room_id})
  end

  @doc """
  Terminates the `GameServer` process normally. It won't be restarted.
  """
  def destroy_room(room_id) do
    child_pid = RoomServer.room_pid(room_id)
    DynamicSupervisor.terminate_child(__MODULE__, child_pid)
  end
end
