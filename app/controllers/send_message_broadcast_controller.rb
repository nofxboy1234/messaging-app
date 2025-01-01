class SendMessageBroadcastController < BroadcastController
  def create
    user = User.find(broadcast_params[:user_id])
    chat = Chat.find(broadcast_params[:chat_id])

    broadcast_last_message(chat, user)

    head :ok
  end

  private
    def broadcast_params
      params.require(:send_message_broadcast).permit(:user_id, :chat_id)
    end
end
