class FriendsController < ApplicationController
  before_action :set_friend, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /friends
  def index
    @friends = Current.user.friends
    render inertia: "Friend/Index", props: {
      friends: @friends.map do |friend|
        serialize_friend(friend)
      end
    }
  end

  # GET /friends/1
  def show
    render inertia: "Friend/Show", props: {
      friend: serialize_friend(@friend)
    }
  end

  # GET /friends/new
  def new
    @friend = Friend.new
    render inertia: "Friend/New", props: {
      friend: serialize_friend(@friend)
    }
  end

  # GET /friends/1/edit
  def edit
    render inertia: "Friend/Edit", props: {
      friend: serialize_friend(@friend)
    }
  end

  # POST /friends
  def create
    @friend = Friend.new(friend_params)

    if @friend.save
      redirect_to @friend, notice: "Friend was successfully created."
    else
      redirect_to new_friend_url, inertia: { errors: @friend.errors }
    end
  end

  # PATCH/PUT /friends/1
  def update
    if @friend.update(friend_params)
      redirect_to @friend, notice: "Friend was successfully updated."
    else
      redirect_to edit_friend_url(@friend), inertia: { errors: @friend.errors }
    end
  end

  # DELETE /friends/1
  def destroy
    @friend.destroy!
    redirect_to friends_url, notice: "Friend was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend
      @friend = Friend.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friend_params
      params.fetch(:friend, {})
    end

    def serialize_friend(friend)
      friend.as_json(only: [
        :id, :email
      ])
    end
end
