class FriendshipsController < ApplicationController
  def index
    @friends = Current.user.friends
    render inertia: "Friendships/Index", props: {
      friends: @friends.map do |friend|
        serialize_friend(friend)
      end
    }
  end

  def create
    @friend = User.find(friendship_params[:user_id])
    Current.user.accept_request(@friend)

    head :created
  end

  def destroy
    @friend = User.find(params[:user_id])
    Current.user.remove_friend(@friend)

    head :ok
  end

  private

  def friendship_params
    params.require(:friendship).permit(:id, :user_id)
  end

  def serialize_friend(user)
    user.as_json(include: :profile)
  end
end
