class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ destroy ]

  def index
    @friend_requests = friend_requests(Current.user)

    render inertia: "FriendRequest/Index", props: {
      initialOutgoingFriendRequests: @friend_requests.outgoing_friend_requests,
      initialIncomingFriendRequests: @friend_requests.incoming_friend_requests
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
    user = User.find(@friend_request.user_id)
    friend = User.find(@friend_request.friend_id)

    @friend_request.destroy!

    FriendRequestChannel.broadcast_to(user, {
      initialOutgoingFriendRequests: friend_requests(user)[:outgoing_friend_requests],
      initialIncomingFriendRequests: friend_requests(user)[:incoming_friend_requests]
    })

    FriendRequestChannel.broadcast_to(friend, {
      initialOutgoingFriendRequests: friend_requests(friend)[:outgoing_friend_requests],
      initialIncomingFriendRequests: friend_requests(friend)[:incoming_friend_requests]
    })

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
  end

  private
    def friend_requests(user)
      {
        outgoing_friend_requests: user.outgoing_friend_requests.map do |friend_request|
          serialize_friend_request(friend_request)
        end,
        incoming_friend_requests: user.incoming_friend_requests.map do |friend_request|
          serialize_friend_request(friend_request)
        end
      }
    end

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
