class OutgoingFriendsController < ApplicationController
  before_action :set_outgoing_friend, only: %i[ destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /outgoing_friends
  def index
    @outgoing_friends = Current.user.outgoing_friends
    render inertia: "OutgoingFriend/Index", props: {
      outgoing_friends: @outgoing_friends.map do |outgoing_friend|
        serialize_outgoing_friend(outgoing_friend)
      end
    }
  end

  # GET /outgoing_friends/1
  # def show
  #   render inertia: "OutgoingFriend/Show", props: {
  #     outgoing_friend: serialize_outgoing_friend(@outgoing_friend)
  #   }
  # end

  # GET /outgoing_friends/new
  # def new
  #   @outgoing_friend = OutgoingFriend.new
  #   render inertia: "OutgoingFriend/New", props: {
  #     outgoing_friend: serialize_outgoing_friend(@outgoing_friend)
  #   }
  # end

  # GET /outgoing_friends/1/edit
  # def edit
  #   render inertia: "OutgoingFriend/Edit", props: {
  #     outgoing_friend: serialize_outgoing_friend(@outgoing_friend)
  #   }
  # end

  # POST /outgoing_friends
  def create
    @outgoing_friend = OutgoingFriend.new(outgoing_friend_params)

    if @outgoing_friend.save
      redirect_to @outgoing_friend, notice: "Outgoing friend was successfully created."
    else
      redirect_to new_outgoing_friend_url, inertia: { errors: @outgoing_friend.errors }
    end
  end

  # PATCH/PUT /outgoing_friends/1
  # def update
  #   if @outgoing_friend.update(outgoing_friend_params)
  #     redirect_to @outgoing_friend, notice: "Outgoing friend was successfully updated."
  #   else
  #     redirect_to edit_outgoing_friend_url(@outgoing_friend), inertia: { errors: @outgoing_friend.errors }
  #   end
  # end

  # DELETE /outgoing_friends/1
  def destroy
    # @friend.destroy!
    Current.user.outgoing_friends.destroy(@outgoing_friend)
    # redirect_to friends_url, notice: "Friend was successfully destroyed."
    head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outgoing_friend
      @outgoing_friend = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def outgoing_friend_params
      params.fetch(:outgoing_friend, {})
    end

    def serialize_outgoing_friend(outgoing_friend)
      outgoing_friend.as_json(only: [
        :id, :email
      ], include: :profile)
    end
end
