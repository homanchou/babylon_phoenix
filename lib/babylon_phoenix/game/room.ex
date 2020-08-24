defmodule BabylonPhoenix.Game.Room do
  defstruct players: %{}
  alias BabylonPhoenix.Game.Room
  alias BabylonPhoenix.Game.Player

  def new() do
    %Room{}
  end

  def player_joined(room = %Room{}, username) do
    {_, new_players} =
      Map.get_and_update(room.players, username, fn value ->
        {value,
         %Player{
           username: username
         }}
      end)

    %Room{room | players: new_players}
  end

  def player_left(room = %Room{}, username) do
    new_players = Map.delete(room.players, username)
    %Room{room | players: new_players}
  end
end
