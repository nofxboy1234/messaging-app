class UnfriendBroadcastController < BroadcastController
  def create
    user = User.find(broadcast_params[:user_id])
    friend = User.find(broadcast_params[:friend_id])

    broadcast_friendships(user)
    broadcast_chats(user)
    broadcast_relationship(friend, user)

    broadcast_friendships(friend)
    broadcast_chats(friend)
    broadcast_relationship(user, friend)

    head :ok
  end

  private
    def broadcast_params
      params.require(:unfriend_broadcast).permit(:user_id, :friend_id)
    end
end
