class AllUsersBroadcastController < BroadcastController
  def create
    broadcast_all_users

    head :ok
  end

  private
  # def broadcast_params
  #   params.require(:all_users_broadcast).permit(:user_id, :chat_id)
  # end
end
