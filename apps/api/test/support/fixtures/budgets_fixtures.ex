defmodule EinfachApi.BudgetsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `EinfachApi.Budgets` context.
  """

  @doc """
  Generate a budget.
  """
  def budget_fixture(attrs \\ %{}) do
    {:ok, budget} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> EinfachApi.Budgets.create_budget()

    budget
  end
end
