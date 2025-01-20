class UsersController < ApplicationController
  def index
    @users = User.includes(:profile).as_json(include: :profile)

    render inertia: "User/Index", props: {
      initialUsers: @users,
      isShowingChat: false
    }
  end
end
