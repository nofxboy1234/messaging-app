class MessagesController < ApplicationController
  def create
    @message = User.find(1).messages.build(message_params)
    @message.save!

    head :created
  end

  private
    def message_params
      params.require(:message).permit(:body, :chat_id)
    end

  # def serialize_message(message)
  #   message.as_json(include: { user: { include: :profile } })
  # end
end
