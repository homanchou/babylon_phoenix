defmodule BabylonPhoenix.Game.Player do
  defstruct username: "",
            ws_connected?: false,
            audio_streaming?: false,
            receiving_audio_from: %{},
            receiving_avatar_data: false
end
