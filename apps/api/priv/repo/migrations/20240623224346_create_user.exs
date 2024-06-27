defmodule EinfachApi.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:user, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :email, :string
      add :hashed_password, :string
      add :reset_token, :string, null: true
      add :reset_token_expires_at, :utc_datetime, null: true

      timestamps(type: :utc_datetime)
    end

    create unique_index(:user, [:email])
  end
end
