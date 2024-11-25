class FriendsController < ApplicationController
  before_action :set_friend, only: %i[ show destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /friends
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

  # GET /friends/1
  def show
    render inertia: "Friend/Show", props: {
      friend: serialize_friend(@friend)
    }
  end

  # GET /friends/new
  # def new
  #   @friend = Friend.new
  #   render inertia: "Friend/New", props: {
  #     friend: serialize_friend(@friend)
  #   }
  # end

  # GET /friends/1/edit
  # def edit
  #   render inertia: "Friend/Edit", props: {
  #     friend: serialize_friend(@friend)
  #   }
  # end

  # POST /friends
  def create
    @friend = User.find(friend_params[:id])
    Current.user.friends << @friend

    redirect_to incoming_friends_path, notice: "You are now friends with #{@friend.profile.username}"
    # head :created
  end

  # PATCH/PUT /friends/1
  # def update
  #   if @friend.update(friend_params)
  #     redirect_to @friend, notice: "Friend was successfully updated."
  #   else
  #     redirect_to edit_friend_url(@friend), inertia: { errors: @friend.errors }
  #   end
  # end

  # DELETE /friends/1
  def destroy
    # @friend.destroy!
    Current.user.friends.destroy(@friend)
    redirect_to friends_path
    # head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend
      @friend = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friend_params
      params.fetch(:friend, {})
    end

    def serialize_friend(friend)
      friend.as_json(only: [
        :id, :email
      ], include: :profile)
    end
end
