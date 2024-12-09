class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ destroy ]

  def index
    @friend_requests = FriendRequest.all

    @outgoing_friends = Current.user.outgoing_friends
    @incoming_friends = Current.user.incoming_friends

    render inertia: "FriendRequest/Index", props: {
      outgoingFriends: @outgoing_friends.map do |friend_request|
        serialize_pending_friend(friend_request)
      end,
      incomingFriends: @incoming_friends.map do |friend_request|
        serialize_pending_friend(friend_request)
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
    redirect_back_or_to pending_friends_url, notice: "Friend request was successfully destroyed."
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

    def serialize_pending_friend(pending_friend)
      pending_friend.as_json(include: :profile)
    end
end
