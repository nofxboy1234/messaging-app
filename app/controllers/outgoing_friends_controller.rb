class OutgoingFriendsController < ApplicationController
  before_action :set_outgoing_friend, only: %i[ destroy ]

  inertia_share flash: -> { flash.to_hash }

  def index
    @outgoing_friends = Current.user.outgoing_friends
    render inertia: "OutgoingFriend/Index", props: {
      outgoing_friends: @outgoing_friends.map do |outgoing_friend|
        serialize_outgoing_friend(outgoing_friend)
      end
    }
  end

  def create
    @outgoing_friend = User.find(outgoing_friend_params[:id])
    Current.user.outgoing_friends << @outgoing_friend

    head :created
  end

  def destroy
    # @friend.destroy!
    Current.user.outgoing_friends.destroy(@outgoing_friend)
    redirect_to outgoing_friends_path
    # head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outgoing_friend
      @outgoing_friend = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def outgoing_friend_params
      params.fetch(:outgoing_friend, {})
    end

    def serialize_outgoing_friend(outgoing_friend)
      outgoing_friend.as_json(only: [
        :id, :email
      ], include: :profile)
    end
end
