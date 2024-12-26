class ProfileBroadcastController < BroadcastController
  def create
    profile = Profile.find(broadcast_params[:id])
    broadcast_profile(profile)

    head :ok
  end

  private
    def broadcast_params
      params.require(:profile_broadcast).permit(:id)
    end
end
