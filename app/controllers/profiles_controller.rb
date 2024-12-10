class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[ show edit update ]

  # GET /profiles/1
  def show
    user = @profile.user

    if Current.user.friends_with?(user)
      relationship = "friend"
      friendship = Current.user.friendships.find_by(friend: user)
      chat = Current.user.find_direct_message_chat_with(user)
    elsif Current.user.has_outgoing_friend?(user)
      relationship = "outgoingRequest"
      friend_request = Current.user.outgoing_friend_requests.find_by(friend: user)
    elsif Current.user.has_incoming_friend?(user)
      relationship = "incomingRequest"
      friend_request = Current.user.incoming_friend_requests.find_by(user: user)
    else
      relationship = "stranger"
    end

    render inertia: "Profile/Show", props: {
      profile: serialize_profile(@profile),
      relationship: relationship,
      friendRequest: serialize_friend_request(friend_request),
      friendship: friendship,
      chat: chat
    }
  end

  # GET /profiles/1/edit
  def edit
    render inertia: "Profile/Edit", props: {
      profile: serialize_profile(@profile)
    }
  end

  # PATCH/PUT /profiles/1
  def update
    if @profile.update(profile_params)
      redirect_to @profile, notice: "Profile was successfully updated."
    else
      redirect_to edit_profile_url(@profile), inertia: { errors: @profile.errors }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def profile_params
      params.require(:profile).permit(:username, :picture, :about)
    end

    def serialize_profile(profile)
      profile.as_json(include: { user: { include: :profile } })
    end

    def serialize_friend_request(friend_request)
      friend_request.as_json(include: [
        { user: { include: :profile } },
        { friend: { include: :profile } }
      ])
    end
end
