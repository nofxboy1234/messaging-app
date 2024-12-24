class CancelFriendRequestBroadcastController < BroadcastController
  def create
    user = User.find(broadcast_params[:user_id])
    friend = User.find(broadcast_params[:friend_id])

    broadcast_friend_requests(user)
    broadcast_relationship(friend, user)

    broadcast_friend_requests(friend)
    broadcast_relationship(user, friend)

    head :ok
  end

  private
    def broadcast_params
      params.require(:cancel_friend_request_broadcast).permit(:user_id, :friend_id)
    end
end
