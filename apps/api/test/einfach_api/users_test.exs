defmodule EinfachApi.UsersTest do
  use EinfachApi.DataCase

  alias EinfachApi.Users

  describe "user" do
    alias EinfachApi.Users.User

    import EinfachApi.UsersFixtures

    @invalid_attrs %{
      name: nil,
      email: nil,
      hashed_password: nil,
      reset_token: nil,
      reset_token_expires_at: nil
    }

    test "list_user/0 returns all user" do
      user = user_fixture()
      assert Users.list_user() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{
        name: "some name",
        email: "some email",
        hashed_password: "some hashed_password",
        reset_token: "some reset_token",
        reset_token_expires_at: ~U[2024-06-22 00:00:00Z]
      }

      assert {:ok, %User{} = user} = Users.create_user(valid_attrs)
      assert user.name == "some name"
      assert user.email == "some email"
      assert user.hashed_password == "some hashed_password"
      assert user.reset_token == "some reset_token"
      assert user.reset_token_expires_at == ~U[2024-06-22 00:00:00Z]
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()

      update_attrs = %{
        name: "some updated name",
        email: "some updated email",
        hashed_password: "some updated hashed_password",
        reset_token: "some updated reset_token",
        reset_token_expires_at: ~U[2024-06-23 00:00:00Z]
      }

      assert {:ok, %User{} = user} = Users.update_user(user, update_attrs)
      assert user.name == "some updated name"
      assert user.email == "some updated email"
      assert user.hashed_password == "some updated hashed_password"
      assert user.reset_token == "some updated reset_token"
      assert user.reset_token_expires_at == ~U[2024-06-23 00:00:00Z]
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
