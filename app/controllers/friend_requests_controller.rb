class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /friend_requests
  def index
    @friend_requests = FriendRequest.all
    render inertia: 'FriendRequest/Index', props: {
      friend_requests: @friend_requests.map do |friend_request|
        serialize_friend_request(friend_request)
      end
    }
  end

  # GET /friend_requests/1
  def show
    render inertia: 'FriendRequest/Show', props: {
      friend_request: serialize_friend_request(@friend_request)
    }
  end

  # GET /friend_requests/new
  def new
    @friend_request = FriendRequest.new
    render inertia: 'FriendRequest/New', props: {
      friend_request: serialize_friend_request(@friend_request)
    }
  end

  # GET /friend_requests/1/edit
  def edit
    render inertia: 'FriendRequest/Edit', props: {
      friend_request: serialize_friend_request(@friend_request)
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

  # PATCH/PUT /friend_requests/1
  def update
    if @friend_request.update(friend_request_params)
      redirect_to @friend_request, notice: "Friend request was successfully updated."
    else
      redirect_to edit_friend_request_url(@friend_request), inertia: { errors: @friend_request.errors }
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
      params.require(:friend_request).permit(:user_id, :friend_id)
    end

    def serialize_friend_request(friend_request)
      friend_request.as_json(only: [
        :id, :user_id, :friend_id
      ])
    end
end
