class MessageChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend MessageChannel subscribed ***"
    chat = Chat.find(params[:id])
    stream_for chat
  end

  def unsubscribed
    puts "*** backend MessageChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend MessageChannel receive ***"
  end
end
