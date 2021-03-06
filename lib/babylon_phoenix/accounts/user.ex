defmodule BabylonPhoenix.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias BabylonPhoenix.Accounts.Credential

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  @foreign_key_type Ecto.UUID
  schema "users" do
    field :name, :string
    field :username, :string
    has_one :credential, Credential
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username])
    |> validate_required([:name, :username])
    |> unique_constraint(:username)
  end

  def registration_changeset(user, params) do
    user
    |> changeset(params)
    |> cast_assoc(:credential, with: &Credential.changeset/2, required: true)
  end
end
