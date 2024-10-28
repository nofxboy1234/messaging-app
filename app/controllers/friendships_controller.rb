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
    @friend = User.find(friendship_params[:friend_id])
    Current.user.friend_request(@friend)
    @friend.accept_request(Current.user)

    head :created
    # head :ok
    # render inertia: "Profile/Show", props: { status: :ok }
  end

  def destroy
    @friend = User.find(params[:id])
    Current.user.remove_friend(@friend)

    head :ok
  end

  private

  def friendship_params
    params.require(:friendship).permit(:id, :friend_id)
  end

  def serialize_friend(friend)
    friend.as_json(include: :profile)
  end
end
