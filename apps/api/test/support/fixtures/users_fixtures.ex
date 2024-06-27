defmodule EinfachApi.UsersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `EinfachApi.Users` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: "some email",
        hashed_password: "some hashed_password",
        name: "some name",
        reset_token: "some reset_token",
        reset_token_expires_at: ~U[2024-06-22 00:00:00Z]
      })
      |> EinfachApi.Users.create_user()

    user
  end
end
