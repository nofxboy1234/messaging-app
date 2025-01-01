class BroadcastController < ApplicationController
  def create
  end

  private
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

    def broadcast_chat_users(user, chat)
      users = chat.members.includes(:profile).as_json(include: :profile)
      ChatUserChannel.broadcast_to(user, users)
    end

    def broadcast_all_users
      users = User.includes(:profile).as_json(include: :profile)
      ActionCable.server.broadcast("AllUserChannel", users)
    end

    def broadcast_all_users_to_user(user)
      users = User.includes(:profile).as_json(include: :profile)
      PerUserAllUserChannel.broadcast_to(user, users)
    end

    def broadcast_relationship(profile_owner, viewer)
      profile_show_data = profile_owner.profile.show_data(viewer)
      ActionCable.server.broadcast(
        "RelationshipChannel_#{profile_owner.profile.id}_#{viewer.id}",
        profile_show_data
        )
    end

    def broadcast_profile(profile)
      ProfileChannel.broadcast_to(profile, profile.serialize)
    end
end
