class ChatChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend chat channel subscribed"
    chat = Chat.find(params[:id])
    stream_for chat
  end

  def unsubscribed
    puts "*** backend chat channel unsubscribed"

    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
  end
end
