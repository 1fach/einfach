defmodule EinfachApiWeb.UserControllerTest do
  use EinfachApiWeb.ConnCase

  import EinfachApi.UsersFixtures

  alias EinfachApi.Users.User

  @create_attrs %{
    name: "some name",
    email: "some email",
    hashed_password: "some hashed_password",
    reset_token: "some reset_token",
    reset_token_expires_at: ~U[2024-06-22  00:00:00Z]
  }
  @update_attrs %{
    name: "some updated name",
    email: "some updated email",
    hashed_password: "some updated hashed_password",
    reset_token: "some updated reset_token",
    reset_token_expires_at: ~U[2024-06-23 00:00:00Z]
  }
  @invalid_attrs %{
    name: nil,
    email: nil,
    hashed_password: nil,
    reset_token: nil,
    reset_token_expires_at: nil
  }

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all user", %{conn: conn} do
      conn = get(conn, ~p"/api/user")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/user", user: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/user/#{id}")

      assert %{
               "id" => ^id,
               "email" => "some email",
               "hashed_password" => "some hashed_password",
               "name" => "some name",
               "reset_token" => "some reset_token",
               "reset_token_expires_at" => "2024-06-22 00:00:00Z"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/user", user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update user" do
    setup [:create_user]

    test "renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
      conn = put(conn, ~p"/api/user/#{user}", user: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/user/#{id}")

      assert %{
               "id" => ^id,
               "email" => "some updated email",
               "hashed_password" => "some updated hashed_password",
               "name" => "some updated name",
               "reset_token" => "some updated reset_token",
               "reset_token_expires_at" => "2024-06-23 00:00:00Z"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      conn = put(conn, ~p"/api/user/#{user}", user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user", %{conn: conn, user: user} do
      conn = delete(conn, ~p"/api/user/#{user}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/user/#{user}")
      end
    end
  end

  defp create_user(_) do
    user = user_fixture()
    %{user: user}
  end
end
