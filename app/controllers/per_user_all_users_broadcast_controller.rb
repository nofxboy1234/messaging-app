class PerUserAllUsersBroadcastController < BroadcastController
  def create
    user = User.find(broadcast_params[:user_id])

    broadcast_all_users_to_user(user)

    head :ok
  end

  private
  def broadcast_params
    params.require(:per_user_all_users_broadcast).permit(:user_id, :chat_id)
  end
end
