class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ destroy ]

  def index
    @friendships_as_sender = Current.user.friendships_as_sender
    @friendships_as_receiver = Current.user.friendships_as_receiver

    render inertia: "Friendship/Index", props: {
      friendshipsAsSender: @friendships_as_sender.map do |friendship|
        serialize_friendship(friendship)
      end,
      friendshipsAsReceiver: @friendships_as_receiver.map do |friendship|
        serialize_friendship(friendship)
      end
    }
  end

  def create
    @friendship = Friendship.new(friendship_params)

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
