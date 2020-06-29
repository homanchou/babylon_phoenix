defmodule BabylonPhoenixWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info(:ping, socket) do
    count = socket.assigns[:count] || 1
    push(socket, "ping", %{count: count})
    IO.puts("got a ping")
    {:noreply, assign(socket, :count, count + 1)}
  end

  def handle_in("annotation", params, socket) do
    broadcast!(socket, "new_annotation", %{
      hi: params
    })

    {:reply, :ok, socket}
  end

  def handle_in("got_clicked", %{"time" => time}, socket) do
    broadcast_from(socket, "received_got_clicked", %{time: time})
    {:reply, :ok, socket}
  end

  def handle_in("camera_position", pos, socket) do
    broadcast_from(socket, "received_camera_position", pos)
    {:reply, :ok, socket}
  end
end
