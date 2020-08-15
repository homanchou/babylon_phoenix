defmodule BabylonPhoenix.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false
      add :username, :string, null: false

      timestamps()
    end

    create unique_index(:users, [:username])
  end
end
