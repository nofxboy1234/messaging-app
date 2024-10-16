class PersistedChatController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.includes(:user)
    # @messages = Message.all
    render inertia: "PersistedChat/Index", props: {
      message: serialize_message(@message),
      messages: @messages.map { |message| serialize_message(message) }
    }
  end

  private
  # Use callbacks to share common setup or constraints between actions.

  def serialize_message(message)
    message.as_json(only: [
      :id, :body, :user_id
    ])
  end
end
