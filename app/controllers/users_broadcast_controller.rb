class UsersBroadcastController < BroadcastController
  def create
    user = User.find(broadcast_params[:user_id])

    chat_id = broadcast_params[:chat_id]

    if chat_id
      chat = Chat.find(chat_id)
    else
      chat = nil
    end

    broadcast_users(user, chat)

    head :ok
  end

  private
    def broadcast_params
      params.require(:users_broadcast).permit(:user_id, :chat_id)
    end
end
