class MessagesController < ApplicationController
  def create
    @message = current_user&.messages.build(message_params)
    @message.save!

    broadcast_create

    head :created
  end

  private
    def message_params
      params.require(:message).permit(:body, :chat_id)
    end

    def broadcast_create
      user = current_user
      chat = Chat.find(message_params[:chat_id])

      broadcast_last_message(chat, user)
    end

    def broadcast_last_message(chat, user)
      message = chat.messages.where(user: user).last
      MessageChannel.broadcast_to(chat, serialize_message(message))
    end

    def serialize_message(message)
      message.as_json(include: { user: { include: :profile } })
    end
end
