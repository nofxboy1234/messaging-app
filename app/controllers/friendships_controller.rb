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
    Current.user.friends << @friend

    head :created
    # render inertia: "Friendships/Create"
  end

  def update
    render inertia: "Friendships/Update"
  end

  def destroy
    render inertia: "Friendships/Destroy"
  end

  private

  def friendship_params
    params.require(:friendship).permit(:id, :friend_id)
  end

  def serialize_friend(friend)
    friend.as_json(include: :profile)
  end
end
