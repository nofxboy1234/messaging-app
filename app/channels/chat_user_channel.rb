class ChatUserChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend ChatUserChannel subscribed ***"
    chat = Chat.find(params[:id])
    stream_for chat
  end

  def unsubscribed
    puts "*** backend ChatUserChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend ChatUserChannel receive ***"
  end
end
