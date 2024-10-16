class PersistedChatController < ApplicationController
  def index
    @messages = Message.includes(:user)
    # @messages = Message.all
    render inertia: "PersistedChat/Index", props: {
      messages: @messages.map { |message| serialize_message(message) }
    }
  end

  private
  # Use callbacks to share common setup or constraints between actions.

  def serialize_message(message)
    message.as_json(include: :user)
  end
end
