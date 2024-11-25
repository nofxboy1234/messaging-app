class IncomingFriendsController < ApplicationController
  before_action :set_incoming_friend, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /incoming_friends
  def index
    @incoming_friends = Current.user.incoming_friends
    render inertia: "IncomingFriend/Index", props: {
      incoming_friends: @incoming_friends.map do |incoming_friend|
        serialize_incoming_friend(incoming_friend)
      end
    }
  end

  # GET /incoming_friends/1
  def show
    render inertia: "IncomingFriend/Show", props: {
      incoming_friend: serialize_incoming_friend(@incoming_friend)
    }
  end

  # GET /incoming_friends/new
  def new
    @incoming_friend = IncomingFriend.new
    render inertia: "IncomingFriend/New", props: {
      incoming_friend: serialize_incoming_friend(@incoming_friend)
    }
  end

  # GET /incoming_friends/1/edit
  def edit
    render inertia: "IncomingFriend/Edit", props: {
      incoming_friend: serialize_incoming_friend(@incoming_friend)
    }
  end

  # POST /incoming_friends
  def create
    @incoming_friend = IncomingFriend.new(incoming_friend_params)

    if @incoming_friend.save
      redirect_to @incoming_friend, notice: "Incoming friend was successfully created."
    else
      redirect_to new_incoming_friend_url, inertia: { errors: @incoming_friend.errors }
    end
  end

  # PATCH/PUT /incoming_friends/1
  def update
    if @incoming_friend.update(incoming_friend_params)
      redirect_to @incoming_friend, notice: "Incoming friend was successfully updated."
    else
      redirect_to edit_incoming_friend_url(@incoming_friend), inertia: { errors: @incoming_friend.errors }
    end
  end

  # DELETE /incoming_friends/1
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
