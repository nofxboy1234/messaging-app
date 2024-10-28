class PendingFriendshipsController < ApplicationController
  def index
    @outgoing_friend_requests = Current.user.pending_friends
    @incoming_friend_requests = Current.user.requested_friends

    render inertia: "Friendships/Pending", props: {
      outgoing: @outgoing_friend_requests.map do |friend|
        serialize_pending_friend(friend)
      end,
      incoming: @incoming_friend_requests.map do |friend|
        serialize_pending_friend(friend)
      end
    }
  end

  def create
    @friend = User.find(pending_friendship_params[:user_id])
    Current.user.friend_request(@friend)

    head :created
  end

  def destroy
    @friend = User.find(params[:user_id])
    HasFriendship::Friendship.destroy_by(friendable: Current.user, friend: @friend, status: "pending")
    HasFriendship::Friendship.destroy_by(friendable: @friend, friend: Current.user, status: "requested")

    head :ok
  end

  private

  def pending_friendship_params
    params.require(:friendship).permit(:id, :user_id)
  end

  def serialize_pending_friend(friend)
    friend.as_json(include: :profile)
  end
end
