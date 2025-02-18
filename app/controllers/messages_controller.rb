class MessagesController < ApplicationController
  rescue_from ActionPolicy::Unauthorized do |ex|
    puts "*************"
    puts ex.policy
    puts ex.rule
    puts "*************"
  end

  def create
    @message = current_user&.messages.build(message_params)
    authorize! @message

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
      MessageChannel.broadcast_to(chat, message.serialize)
    end
end
