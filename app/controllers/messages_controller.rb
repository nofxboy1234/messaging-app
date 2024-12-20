class MessagesController < ApplicationController
  def create
    @message = Current.user.messages.build(message_params)
    @message.save!

    ChatChannel.broadcast_to(@message.chat, serialize_message(@message))

    head :created
  end

  private
    def message_params
      params.require(:message).permit(:id, :body, :chat_id)
    end

    def serialize_message(message)
      message.as_json(include: { user: { include: :profile } })
    end
end
