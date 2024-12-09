class IncomingFriendsController < ApplicationController
  before_action :set_incoming_friend, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  def index
    @incoming_friends = Current.user.incoming_friends
    render inertia: "IncomingFriend/Index", props: {
      incoming_friends: @incoming_friends.map do |incoming_friend|
        serialize_incoming_friend(incoming_friend)
      end
    }
  end

  def destroy
    Current.user.incoming_friends.destroy(@incoming_friend)
    # redirect_to incoming_friends_path, notice: "Friend was successfully destroyed."
    head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_incoming_friend
      @incoming_friend = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def incoming_friend_params
      params.fetch(:incoming_friend, {})
    end

    def serialize_incoming_friend(incoming_friend)
      incoming_friend.as_json(only: [
        :id, :email
      ], include: :profile)
    end
end
