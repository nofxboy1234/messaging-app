class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ destroy ]

  def index
    @friendships = Current.user&.friends&.includes(:profile)&.map do |friend|
      chat = Current.user&.find_direct_message_chat_with(friend)
      friendship = Current.user&.find_friendship_with(friend)
      { friend: friend.as_json(include: :profile),
        chat: chat,
        friendship: friendship }
    end

    render inertia: "Friendship/Index", props: {
      friendships: @friendships
    }
  end

  def create
    @friendship = Friendship.new(friendship_params)
    chat = Chat.new
    user1 = User.find(@friendship[:user_id])
    user2 = User.find(@friendship[:friend_id])
    chat.members << [ user1, user2 ]
    @friendship.chat = chat

    if @friendship.save
      redirect_back_or_to friendships_url, notice: "Friendship was successfully created."
    else
      redirect_back_or_to friendships_url, inertia: { errors: @friendship.errors }
    end
  end

  def destroy
    @friendship.destroy!
    redirect_back_or_to friendships_url, notice: "Friendship was successfully destroyed."
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
