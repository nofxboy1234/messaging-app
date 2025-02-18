class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ destroy ]

  def index
    @friend_requests = current_user&.friend_requests

    render inertia: "FriendRequest/Index", props: {
      initialOutgoingFriendRequests: @friend_requests[:outgoing_friend_requests],
      initialIncomingFriendRequests: @friend_requests[:incoming_friend_requests]
    }
  end

  def create
    @friend_request = FriendRequest.new(friend_request_params)
    @friend = User.find(friend_request_params[:friend_id])

    if @friend_request.save
      broadcast_create
      head :ok
    else
      redirect_to @friend.profile, inertia: { errors: @friend_request.errors }
    end
  end

  def destroy
    @friend_request.destroy!
    broadcast_destroy

    head :ok
  end

  private
    def broadcast_create
      user = @friend_request.user
      friend = @friend_request.friend

      broadcast_friend_requests(user)
      broadcast_relationship(friend, user)

      broadcast_friend_requests(friend)
      broadcast_relationship(user, friend)
    end

    def broadcast_destroy
      user = @friend_request.user
      friend = @friend_request.friend

      broadcast_friend_requests(user)
      broadcast_relationship(friend, user)

      broadcast_friend_requests(friend)
      broadcast_relationship(user, friend)
    end

    def broadcast_friend_requests(user)
      FriendRequestChannel.broadcast_to(user, {
        initialOutgoingFriendRequests: user.friend_requests[:outgoing_friend_requests],
        initialIncomingFriendRequests: user.friend_requests[:incoming_friend_requests]
      })
    end

    def broadcast_relationship(profile_owner, viewer)
      profile_show_data = profile_owner.profile.show_data(viewer)
      ActionCable.server.broadcast(
        "RelationshipChannel_#{profile_owner.profile.id}_#{viewer.id}",
        profile_show_data
        )
    end


    def set_friend_request
      @friend_request = FriendRequest.find(params[:id])
    end

    def friend_request_params
      params.require(:friend_request).permit(:user_id, :friend_id)
    end
end
