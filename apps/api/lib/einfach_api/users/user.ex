defmodule EinfachApi.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias EinfachApi.Ecto.UUID7

  @primary_key {:id, UUID7, prefix: "user", autogenerate: true}
  @foreign_key_type UUID7
  schema "user" do
    field :name, :string
    field :email, :string
    field :hashed_password, :string
    field :reset_token, :string
    field :reset_token_expires_at, :utc_datetime
    has_many :budgets, EinfachApi.Budgets.Budget

    timestamps(type: :utc_datetime)
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :hashed_password, :reset_token, :reset_token_expires_at])
    |> validate_required([:name, :email, :hashed_password])
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{hashed_password: password}} ->
        put_change(changeset, :hashed_password, Bcrypt.hash_pwd_salt(password))

      _ ->
        changeset
    end
  end
end
