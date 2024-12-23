class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ destroy ]

  def index
    @friendships = Current.user.friendships_data

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
      head :ok
    else
      redirect_back_or_to friendships_url, inertia: { errors: @friendship.errors }
    end
  end

  def destroy
    user = User.find(@friendship.user_id)
    friend = User.find(@friendship.friend_id)

    @friendship.destroy!

    ChatChannel.broadcast_to(user, user.chats_data)
    FriendshipChannel.broadcast_to(user, user.friendships_data)
    ActionCable.server.broadcast(
      "ProfileChannel_#{user.profile.id}_#{friend.id}",
      user.profile.show_data(friend)
    )

    ChatChannel.broadcast_to(friend, friend.chats_data)
    FriendshipChannel.broadcast_to(friend, friend.friendships_data)
    ActionCable.server.broadcast(
      "ProfileChannel_#{friend.profile.id}_#{user.id}",
      friend.profile.show_data(user)
    )

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

    def serialize_friendship(friendship)
      friendship.as_json(include: [
        { user: { include: :profile } },
        { friend: { include: :profile } }
      ])
    end
end
