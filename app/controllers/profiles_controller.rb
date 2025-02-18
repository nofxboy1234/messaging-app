class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[ show edit update ]

  # GET /profiles/1
  def show
    render inertia: "Profile/Show", props: @profile.show_data(current_user)
  end

  # GET /profiles/1/edit
  def edit
    render inertia: "Profile/Edit", props: {
      profile: @profile.serialize
    }
  end

  # PATCH/PUT /profiles/1
  def update
    if @profile.update(profile_params)
      broadcast_update
      redirect_to @profile, notice: "Profile was successfully updated."
    else
      redirect_to edit_profile_url(@profile), inertia: { errors: @profile.errors }
    end
  end

  private
    def broadcast_update
      ProfileChannel.broadcast_to(@profile, @profile.serialize)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def profile_params
      params.require(:profile).permit(:username, :about)
    end
end
