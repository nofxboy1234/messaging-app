class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ destroy ]

  def index
    @friend_requests = Current.user.friend_requests

    render inertia: "FriendRequest/Index", props: {
      initialOutgoingFriendRequests: @friend_requests[:outgoing_friend_requests],
      initialIncomingFriendRequests: @friend_requests[:incoming_friend_requests]
    }
  end

  def create
    @friend_request = FriendRequest.new(friend_request_params)
    @friend = User.find(friend_request_params[:friend_id])

    if @friend_request.save
      head :ok
    else
      redirect_to @friend.profile, inertia: { errors: @friend_request.errors }
    end
  end

  def destroy
    @friend_request.destroy!
    head :ok
  end

  private
    def set_friend_request
      @friend_request = FriendRequest.find(params[:id])
    end

    def friend_request_params
      params.require(:friend_request).permit(:user_id, :friend_id)
    end
end
