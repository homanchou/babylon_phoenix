defmodule BabylonPhoenix.UtilTest do
  use BabylonPhoenix.DataCase

  describe "random_id" do
    alias BabylonPhoenix.Util

    test "it generates a random id" do
      Enum.each(0..150, fn _ ->
        Util.random_id(5)
        |> IO.inspect()
      end)
    end
  end
end
