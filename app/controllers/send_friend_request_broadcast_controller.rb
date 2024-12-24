class SendFriendRequestBroadcastController < ApplicationController
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
      params.require(:send_friend_request_broadcast).permit(:user_id, :friend_id)
    end

    def broadcast_friend_requests(user)
      FriendRequestChannel.broadcast_to(user, {
        initialOutgoingFriendRequests: user.friend_requests[:outgoing_friend_requests],
        initialIncomingFriendRequests: user.friend_requests[:incoming_friend_requests]
      })
    end

    def broadcast_relationship(profile_owner, viewer)
      profile_show_data = profile_owner.profile.show_data(viewer)
      ActionCable.server.broadcast(
        "RelationshipChannel_#{profile_owner.profile.id}_#{viewer.id}",
        profile_show_data
      )
    end
end
