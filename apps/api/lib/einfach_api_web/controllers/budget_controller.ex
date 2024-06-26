defmodule EinfachApiWeb.BudgetController do
  use EinfachApiWeb, :controller

  alias EinfachApi.Budgets
  alias EinfachApi.Budgets.Budget

  import EinfachApiWeb.Auth.AuthorizedPlug

  plug :is_authorized when action in [:update, :delete]

  action_fallback EinfachApiWeb.FallbackController

  def index(conn, _params) do
    budget = Budgets.list_budget()
    render(conn, :index, budget: budget)
  end

  def create(conn, %{"budget" => budget_params}) do
    with {:ok, %Budget{} = budget} <- Budgets.create_budget(budget_params) do
      conn
      |> put_status(:created)
      |> render(:show, budget: budget)
    end
  end

  def show(conn, %{"id" => id}) do
    budget = Budgets.get_budget!(id)
    render(conn, :show, budget: budget)
  end

  def update(conn, %{"id" => id, "budget" => budget_params}) do
    budget = Budgets.get_budget!(id)

    with {:ok, %Budget{} = budget} <- Budgets.update_budget(budget, budget_params) do
      render(conn, :show, budget: budget)
    end
  end

  def delete(conn, %{"id" => id}) do
    budget = Budgets.get_budget!(id)

    with {:ok, %Budget{}} <- Budgets.delete_budget(budget) do
      send_resp(conn, :no_content, "")
    end
  end
end
