defmodule BabylonPhoenixWeb.RoomController do
  use BabylonPhoenixWeb, :controller

  alias BabylonPhoenix.{Game, RoomServer, RoomSupervisor}
  # alias BabylonPhoenix.Game.Room
  alias BabylonPhoenix.Util

  # def index(conn, _params) do
  #   rooms = Game.list_rooms()
  #   render(conn, "index.html", rooms: rooms)
  # end

  def new(conn, _params) do
    # changeset = Game.change_room(%Room{})
    render(conn, "new.html")
  end

  def create(conn, _params) do
    random_id = Util.random_id(5)

    if RoomServer.room_pid(random_id) == nil do
      RoomSupervisor.create_room(random_id)
    end

    conn |> redirect(to: Routes.room_path(conn, :show, random_id))

    # case Game.create_room(room_params) do
    #   {:ok, room} ->
    #     conn
    #     |> put_flash(:info, "Room created successfully.")
    #     |> redirect(to: Routes.room_path(conn, :show, room))

    #   {:error, %Ecto.Changeset{} = changeset} ->
    #     render(conn, "new.html", changeset: changeset)
    # end
  end

  def show(conn, %{"id" => id}) do
    if RoomServer.room_pid(id) == nil do
      conn
      |> put_flash(:error, "That room does not appear to be accessible now")
      |> redirect(to: Routes.page_path(conn, :index))
    else
      render(conn, "show.html")
    end
  end

  # def edit(conn, %{"id" => id}) do
  #   room = Game.get_room!(id)
  #   changeset = Game.change_room(room)
  #   render(conn, "edit.html", room: room, changeset: changeset)
  # end

  # def update(conn, %{"id" => id, "room" => room_params}) do
  #   room = Game.get_room!(id)

  #   case Game.update_room(room, room_params) do
  #     {:ok, room} ->
  #       conn
  #       |> put_flash(:info, "Room updated successfully.")
  #       |> redirect(to: Routes.room_path(conn, :show, room))

  #     {:error, %Ecto.Changeset{} = changeset} ->
  #       render(conn, "edit.html", room: room, changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   room = Game.get_room!(id)
  #   {:ok, _room} = Game.delete_room(room)

  #   conn
  #   |> put_flash(:info, "Room deleted successfully.")
  #   |> redirect(to: Routes.room_path(conn, :index))
  # end
end
