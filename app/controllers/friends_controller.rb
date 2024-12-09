class FriendsController < ApplicationController
  before_action :set_friend, only: %i[ show destroy ]

  inertia_share flash: -> { flash.to_hash }

  def index
    current_user = Current.user
    @friends = current_user.friends
    render inertia: "Friend/Index", props: {
      friends: @friends.map do |friend|
        serialized_friend = serialize_friend(friend)
        serialized_friend
      end
    }
  end

  def show
    render inertia: "Friend/Show", props: {
      friend: serialize_friend(@friend)
    }
  end

  def create
    @friend = User.find(friend_params[:id])
    Current.user.friends << @friend

    redirect_back_or_to friend_requests_url, notice: "You are now friends with #{@friend.profile.username}"
  end

  def destroy
    Current.user.friends.destroy(@friend)
    redirect_to friends_path
  end

  private
    def set_friend
      @friend = User.find(params[:id])
    end

    def friend_params
      params.fetch(:friend, {})
    end

    def serialize_friend(friend)
      friend.as_json(only: [
        :id, :email
      ], include: :profile)
    end
end
