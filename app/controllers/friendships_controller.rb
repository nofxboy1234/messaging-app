class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ destroy ]

  def index
    @friendships = friendships(Current.user)

    render inertia: "Friendship/Index", props: {
      initialFriendships: @friendships
    }
  end

  def create
    @friendship = Friendship.new(friendship_params)
    chat = Chat.new
    user = User.find(@friendship[:user_id])
    friend = User.find(@friendship[:friend_id])
    chat.members << [ user, friend ]
    @friendship.chat = chat

    if @friendship.save
      ChatChannel.broadcast_to(user, chats(user))
      ChatChannel.broadcast_to(friend, chats(friend))

      FriendshipChannel.broadcast_to(user, friendships(user))
      FriendshipChannel.broadcast_to(friend, friendships(friend))

      friend_profile_show_data = user.profile.show_data(friend)
      ActionCable.server.broadcast(
        "ProfileChannel_#{user.profile.id}_#{friend.id}",
        friend_profile_show_data
      )

      user_profile_show_data = friend.profile.show_data(user)
      ActionCable.server.broadcast(
        "ProfileChannel_#{friend.profile.id}_#{user.id}",
        user_profile_show_data
      )

      head :ok
    else
      redirect_back_or_to friendships_url, inertia: { errors: @friendship.errors }
    end
  end

  def destroy
    user = User.find(@friendship.user_id)
    friend = User.find(@friendship.friend_id)

    @friendship.destroy!

    ChatChannel.broadcast_to(user, chats(user))
    FriendshipChannel.broadcast_to(user, friendships(user))
    ActionCable.server.broadcast(
      "ProfileChannel_#{user.profile.id}_#{friend.id}",
      user.profile.show_data(friend)
    )

    ChatChannel.broadcast_to(friend, chats(friend))
    FriendshipChannel.broadcast_to(friend, friendships(friend))
    ActionCable.server.broadcast(
      "ProfileChannel_#{friend.profile.id}_#{user.id}",
      friend.profile.show_data(user)
    )

    head :ok
  end

  private
    def chats(user)
      user&.friends&.includes(:profile)&.map do |friend|
        chat = user&.find_direct_message_chat_with(friend)
        { friend: friend.as_json(include: :profile), chat: chat }
      end
    end

    def friendships(user)
      user&.friends&.includes(:profile)&.map do |friend|
        chat = user&.find_direct_message_chat_with(friend)
        friendship = user&.find_friendship_with(friend)
        { friend: friend.as_json(include: :profile),
          chat: chat,
          friendship: friendship }
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.require(:friendship).permit(:user_id, :friend_id)
    end

    def serialize_friendship(friendship)
      friendship.as_json(include: [
        { user: { include: :profile } },
        { friend: { include: :profile } }
      ])
    end
end
