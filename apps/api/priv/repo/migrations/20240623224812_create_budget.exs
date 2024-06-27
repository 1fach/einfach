defmodule EinfachApi.Repo.Migrations.CreateBudget do
  use Ecto.Migration

  def change do
    create table(:budget, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :user_id, references(:user, on_delete: :nothing, type: :binary_id)

      timestamps(type: :utc_datetime)
    end

    create index(:budget, [:user_id])
    create unique_index(:budget, [:name, :user_id])
  end
end
