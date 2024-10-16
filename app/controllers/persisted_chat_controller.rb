class PersistedChatController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.includes(:user)
    puts "*** @messages"
    puts @messages
    puts @messages.first.user if @messages.count > 0
    puts @messages.as_json
    puts @messages.map { |message| serialize_message(message) }
    # @messages = Message.all
    render inertia: "PersistedChat/Index", props: {
      message: serialize_message(@message),
      messages: @messages.map { |message| serialize_message(message) }
    }
  end

  private
  # Use callbacks to share common setup or constraints between actions.

  def serialize_message(message)
    message.as_json(include: :user)
  end
end
