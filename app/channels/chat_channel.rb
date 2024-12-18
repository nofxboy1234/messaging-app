class ChatChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend ChatChannel subscribed ***"
    current_user = User.find(params[:id])
    stream_for current_user
  end

  def unsubscribed
    puts "*** backend ChatChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend ChatChannel receive ***"
  end
end
