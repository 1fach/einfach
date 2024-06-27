defmodule EinfachApi.Budgets.Budget do
  use Ecto.Schema
  import Ecto.Changeset
  alias EinfachApi.Ecto.UUID7

  @primary_key {:id, UUID7, prefix: "bdgt", autogenerate: true}
  @foreign_key_type UUID7
  schema "budget" do
    field :name, :string
    belongs_to :user, EinfachApi.Users.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(budget, attrs) do
    budget
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
