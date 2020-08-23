defmodule BabylonPhoenix.Util do
  # @list_of_chars ["a", "b"]

  # def random_code(size) do
  #   Enum.reduce(0..(size -1), [], fn _, acc ->
  #     [ | acc]
  #   end)
  # end

  def random_letter_or_number(num) do
    cond do
      num < 10 -> num + 48
      num < 36 -> num + 55
      num < 62 -> num + 61
      num == 62 -> 42
      num == 63 -> 94
      num == 64 -> 36
      num == 65 -> 33
      num == 66 -> 45
    end
  end

  def random_id(size) do
    Enum.reduce(0..(size - 1), [], fn _, acc ->
      [random_letter_or_number(Enum.random(0..66)) | acc]
    end)
    |> to_string
  end
end
