class ChatUserChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend ChatUserChannel subscribed ***"
    current_user = User.find(params[:id])
    stream_for current_user
  end

  def unsubscribed
    puts "*** backend ChatUserChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend ChatUserChannel receive ***"
  end
end
