defmodule BabylonPhoenixWeb.PageController do
  use BabylonPhoenixWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
