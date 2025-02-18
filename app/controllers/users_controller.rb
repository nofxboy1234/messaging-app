class UsersController < ApplicationController
  def index
    @users = User.includes(:profile).order("profiles.username").as_json(include: :profile)

    render inertia: "User/Index", props: {
      users: @users
    }
  end
end
