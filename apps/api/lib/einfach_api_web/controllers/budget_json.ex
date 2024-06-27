defmodule EinfachApiWeb.BudgetJSON do
  alias EinfachApi.Budgets.Budget

  @doc """
  Renders a list of budget.
  """
  def index(%{budget: budget}) do
    %{data: for(budget <- budget, do: data(budget))}
  end

  @doc """
  Renders a single budget.
  """
  def show(%{budget: budget}) do
    %{data: data(budget)}
  end

  defp data(%Budget{} = budget) do
    %{
      id: budget.id,
      name: budget.name
    }
  end
end
