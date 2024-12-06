class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /friend_requests
  def index
    @friend_requests = FriendRequest.all
    render inertia: "FriendRequest/Index", props: {
      friend_requests: @friend_requests.map do |friend_request|
        serialize_friend_request(friend_request)
      end
    }
  end

  # POST /friend_requests
  def create
    @friend_request = FriendRequest.new(friend_request_params)

    if @friend_request.save
      redirect_to @friend_request, notice: "Friend request was successfully created."
    else
      redirect_to new_friend_request_url, inertia: { errors: @friend_request.errors }
    end
  end

  # DELETE /friend_requests/1
  def destroy
    @friend_request.destroy!
    redirect_to friend_requests_url, notice: "Friend request was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend_request
      @friend_request = FriendRequest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friend_request_params
      params.fetch(:friend_request, {})
    end

    def serialize_friend_request(friend_request)
      friend_request.as_json(only: [
        :id
      ])
    end
end
