defmodule EinfachApi.BudgetsTest do
  use EinfachApi.DataCase

  alias EinfachApi.Budgets

  describe "budget" do
    alias EinfachApi.Budgets.Budget

    import EinfachApi.BudgetsFixtures

    @invalid_attrs %{name: nil}

    test "list_budget/0 returns all budget" do
      budget = budget_fixture()
      assert Budgets.list_budget() == [budget]
    end

    test "get_budget!/1 returns the budget with given id" do
      budget = budget_fixture()
      assert Budgets.get_budget!(budget.id) == budget
    end

    test "create_budget/1 with valid data creates a budget" do
      valid_attrs = %{name: "some name"}

      assert {:ok, %Budget{} = budget} = Budgets.create_budget(valid_attrs)
      assert budget.name == "some name"
    end

    test "create_budget/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Budgets.create_budget(@invalid_attrs)
    end

    test "update_budget/2 with valid data updates the budget" do
      budget = budget_fixture()
      update_attrs = %{name: "some updated name"}

      assert {:ok, %Budget{} = budget} = Budgets.update_budget(budget, update_attrs)
      assert budget.name == "some updated name"
    end

    test "update_budget/2 with invalid data returns error changeset" do
      budget = budget_fixture()
      assert {:error, %Ecto.Changeset{}} = Budgets.update_budget(budget, @invalid_attrs)
      assert budget == Budgets.get_budget!(budget.id)
    end

    test "delete_budget/1 deletes the budget" do
      budget = budget_fixture()
      assert {:ok, %Budget{}} = Budgets.delete_budget(budget)
      assert_raise Ecto.NoResultsError, fn -> Budgets.get_budget!(budget.id) end
    end

    test "change_budget/1 returns a budget changeset" do
      budget = budget_fixture()
      assert %Ecto.Changeset{} = Budgets.change_budget(budget)
    end
  end
end
