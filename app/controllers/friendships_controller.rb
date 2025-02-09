class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ destroy ]

  def index
    @friendships = User.find(1).friendships_data.sort { |friendship_a, friendship_b| friendship_a[:friend]["profile"]["username"] <=> friendship_b[:friend]["profile"]["username"] }

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
    @friendship.destroy!
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
