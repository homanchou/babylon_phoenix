defmodule BabylonPhoenix.GameTest do
  use BabylonPhoenix.DataCase

  alias BabylonPhoenix.Game.Room

  test "join a game" do
    room = %Room{}
    room = Room.player_joined(room, "tom")
    room = Room.player_joined(room, "tom")

    assert Map.keys(room.players) |> length == 1
  end

  test "exit a game" do
    room = %Room{}
    room = Room.player_joined(room, "tom")
    room = Room.player_left(room, "tom")
    assert room.players == %{}
  end
end
