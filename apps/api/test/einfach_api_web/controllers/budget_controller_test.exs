defmodule EinfachApiWeb.BudgetControllerTest do
  use EinfachApiWeb.ConnCase

  import EinfachApi.BudgetsFixtures

  alias EinfachApi.Budgets.Budget

  @create_attrs %{
    name: "some name"
  }
  @update_attrs %{
    name: "some updated name"
  }
  @invalid_attrs %{name: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all budget", %{conn: conn} do
      conn = get(conn, ~p"/api/budget")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create budget" do
    test "renders budget when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/budget", budget: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/budget/#{id}")

      assert %{
               "id" => ^id,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/budget", budget: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update budget" do
    setup [:create_budget]

    test "renders budget when data is valid", %{conn: conn, budget: %Budget{id: id} = budget} do
      conn = put(conn, ~p"/api/budget/#{budget}", budget: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/budget/#{id}")

      assert %{
               "id" => ^id,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, budget: budget} do
      conn = put(conn, ~p"/api/budget/#{budget}", budget: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete budget" do
    setup [:create_budget]

    test "deletes chosen budget", %{conn: conn, budget: budget} do
      conn = delete(conn, ~p"/api/budget/#{budget}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/budget/#{budget}")
      end
    end
  end

  defp create_budget(_) do
    budget = budget_fixture()
    %{budget: budget}
  end
end
