class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ destroy ]

  def index
    @outgoing_friend_requests = Current.user.outgoing_friend_requests
    @incoming_friend_requests = Current.user.incoming_friend_requests

    render inertia: "FriendRequest/Index", props: {
      outgoingFriendRequests: @outgoing_friend_requests.map do |friend_request|
        serialize_friend_request(friend_request)
      end,
      incomingFriendRequests: @incoming_friend_requests.map do |friend_request|
        serialize_friend_request(friend_request)
      end
    }
  end

  def create
    @friend_request = FriendRequest.new(friend_request_params)
    @friend = User.find(friend_request_params[:friend_id])

    if @friend_request.save
      redirect_to @friend.profile, notice: "Friend request was successfully created."
    else
      redirect_to @friend.profile, inertia: { errors: @friend_request.errors }
    end
  end

  def destroy
    @friend_request.destroy!
    redirect_back_or_to friend_requests_url, notice: "Friend request was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend_request
      @friend_request = FriendRequest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friend_request_params
      params.require(:friend_request).permit(:user_id, :friend_id)
    end

    def serialize_friend_request(friend_request)
      friend_request.as_json(include: [
        { user: { include: :profile } },
        { friend: { include: :profile } }
      ])
    end
end
