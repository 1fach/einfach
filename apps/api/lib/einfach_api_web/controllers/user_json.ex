defmodule EinfachApiWeb.UserJSON do
  alias EinfachApi.Users.User
  alias EinfachApiWeb.BudgetJSON

  @doc """
  Renders a list of user.
  """
  def index(%{user: user}) do
    %{data: for(user <- user, do: data(user))}
  end

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      name: user.name,
      email: user.email,
      hashed_password: user.hashed_password,
      reset_token: user.reset_token,
      reset_token_expires_at: user.reset_token_expires_at
    }
  end

  def full_user(%{user: user}) do
    %{
      data: %{
        id: user.id,
        name: user.name,
        email: user.email,
        budgets: BudgetJSON.show(%{budget: hd(user.budgets)})
      }
    }
  end
end
