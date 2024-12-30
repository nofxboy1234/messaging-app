class ChatUsersBroadcastController < BroadcastController
  def create
    user = User.find(broadcast_params[:user_id])
    chat = Chat.find(broadcast_params[:chat_id])

    broadcast_chat_users(user, chat)

    head :ok
  end

  private
    def broadcast_params
      params.require(:chat_users_broadcast).permit(:user_id, :chat_id)
    end
end
