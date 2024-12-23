class AcceptFriendRequestBroadcastController < ApplicationController
  def create
    user = User.find(broadcast_params[:user_id])
    friend = User.find(broadcast_params[:friend_id])

    broadcast_friend_requests(user)
    broadcast_friendships(user)
    broadcast_chats(user)
    broadcast_profile(friend, user)

    broadcast_friend_requests(friend)
    broadcast_friendships(friend)
    broadcast_chats(friend)
    broadcast_profile(user, friend)

    head :ok
  end

  private
    def broadcast_params
      params.require(:accept_friend_request_broadcast).permit(:user_id, :friend_id)
    end

    def broadcast_friend_requests(user)
      FriendRequestChannel.broadcast_to(user, {
        initialOutgoingFriendRequests: user.friend_requests[:outgoing_friend_requests],
        initialIncomingFriendRequests: user.friend_requests[:incoming_friend_requests]
      })
    end

    def broadcast_friendships(user)
      FriendshipChannel.broadcast_to(user, user.friendships_data)
    end

    def broadcast_chats(user)
      ChatChannel.broadcast_to(user, user.chats_data)
    end

    def broadcast_profile(profile_owner, viewer)
      profile_show_data = profile_owner.profile.show_data(viewer)
      ActionCable.server.broadcast(
        "ProfileChannel_#{profile_owner.profile.id}_#{viewer.id}",
        profile_show_data
      )
    end
end
