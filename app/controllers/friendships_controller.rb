class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /friendships
  def index
    @friendships = Friendship.all
    render inertia: 'Friendship/Index', props: {
      friendships: @friendships.map do |friendship|
        serialize_friendship(friendship)
      end
    }
  end

  # GET /friendships/1
  def show
    render inertia: 'Friendship/Show', props: {
      friendship: serialize_friendship(@friendship)
    }
  end

  # GET /friendships/new
  def new
    @friendship = Friendship.new
    render inertia: 'Friendship/New', props: {
      friendship: serialize_friendship(@friendship)
    }
  end

  # GET /friendships/1/edit
  def edit
    render inertia: 'Friendship/Edit', props: {
      friendship: serialize_friendship(@friendship)
    }
  end

  # POST /friendships
  def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      redirect_to @friendship, notice: "Friendship was successfully created."
    else
      redirect_to new_friendship_url, inertia: { errors: @friendship.errors }
    end
  end

  # PATCH/PUT /friendships/1
  def update
    if @friendship.update(friendship_params)
      redirect_to @friendship, notice: "Friendship was successfully updated."
    else
      redirect_to edit_friendship_url(@friendship), inertia: { errors: @friendship.errors }
    end
  end

  # DELETE /friendships/1
  def destroy
    @friendship.destroy!
    redirect_to friendships_url, notice: "Friendship was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.require(:friendship).permit(:user_id, :friend_id)
    end

    def serialize_friendship(friendship)
      friendship.as_json(only: [
        :id, :user_id, :friend_id
      ])
    end
end
