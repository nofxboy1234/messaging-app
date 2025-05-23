class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ destroy ]

  def index
    @friendships = current_user.chats_with_friends

    render inertia: "Friendship/Index", props: {
      initialChatsWithFriends: @friendships
    }
  end

  def create
    @friendship = Friendship.new(friendship_params)
    chat = Chat.new
    user = @friendship.user
    friend = @friendship.friend
    chat.members << [ user, friend ]
    @friendship.chat = chat

    if @friendship.save
      broadcast_create

      head :ok
    else
      redirect_back_or_to friendships_url, inertia: { errors: @friendship.errors }
    end
  end

  def destroy
    @friendship.destroy!
    broadcast_destroy

    head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.require(:friendship).permit(:user_id, :friend_id)
    end

    def broadcast_create
      user = @friendship.user
      friend = @friendship.friend

      broadcast_friend_requests(user)
      broadcast_friendships(user)
      broadcast_chats(user)
      broadcast_relationship(friend, user)

      broadcast_friend_requests(friend)
      broadcast_friendships(friend)
      broadcast_chats(friend)
      broadcast_relationship(user, friend)
    end

    def broadcast_destroy
      user = @friendship.user
      friend = @friendship.friend

      broadcast_friendships(user)
      broadcast_chats(user)
      broadcast_relationship(friend, user)

      broadcast_friendships(friend)
      broadcast_chats(friend)
      broadcast_relationship(user, friend)
    end

    def broadcast_friend_requests(user)
      FriendRequestChannel.broadcast_to(user, {
        updatedOutgoingFriendRequests: user.friend_requests[:outgoing_friend_requests],
        updatedIncomingFriendRequests: user.friend_requests[:incoming_friend_requests]
      })
    end

    def broadcast_friendships(user)
      FriendshipChannel.broadcast_to(user, user.chats_with_friends)
    end

    def broadcast_chats(user)
      ChatChannel.broadcast_to(user, user.chats_with_friends)
    end

    def broadcast_relationship(profile_owner, viewer)
      profile_show_data = profile_owner.profile.show_data(viewer)
      ActionCable.server.broadcast(
        "RelationshipChannel_#{profile_owner.profile.id}_#{viewer.id}",
        profile_show_data
        )
    end
end
