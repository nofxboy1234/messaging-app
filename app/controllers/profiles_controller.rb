class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[ show edit update destroy ]

  # GET /profiles
  def index
    @profiles = Profile.all
    render inertia: "Profile/Index", props: {
      profiles: @profiles.map do |profile|
        serialize_profile(profile)
      end
    }
  end

  # GET /profiles/1
  def show
    user = @profile.user

    if Current.user.friends_with?(user)
      relationship = "friend"
    elsif Current.user.has_outgoing_friend?(user)
      relationship = "outgoingRequest"
    elsif Current.user.has_incoming_friend?(user)
      relationship = "incomingRequest"
    else
      relationship = "stranger"
    end

    render inertia: "Profile/Show", props: {
      profile: serialize_profile(@profile),
      initialRelationship: relationship
    }
  end

  # GET /profiles/new
  def new
    @profile = Profile.new
    render inertia: "Profile/New", props: {
      profile: serialize_profile(@profile)
    }
  end

  # GET /profiles/1/edit
  def edit
    render inertia: "Profile/Edit", props: {
      profile: serialize_profile(@profile)
    }
  end

  # POST /profiles
  def create
    # @profile = Profile.new(profile_params)
    # @profile.user = Current.user
    @profile = Current.user.build_profile(profile_params)

    if @profile.save
      redirect_to @profile, notice: "Profile was successfully created."
    else
      redirect_to new_profile_url, inertia: { errors: @profile.errors }
    end
  end

  # PATCH/PUT /profiles/1
  def update
    if @profile.update(profile_params)
      redirect_to @profile, notice: "Profile was successfully updated."
    else
      redirect_to edit_profile_url(@profile), inertia: { errors: @profile.errors }
    end
  end

  # DELETE /profiles/1
  def destroy
    @profile.destroy!
    redirect_to profiles_url, notice: "Profile was successfully destroyed."
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
      profile.as_json(only: [
        :id, :username, :picture, :about, :user_id
      ], include: { user: { include: :profile } })
    end
end
