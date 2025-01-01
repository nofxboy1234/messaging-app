class PerUserAllUserChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend PerUserAllUserChannel subscribed ***"
    current_user = User.find(params[:id])
    stream_for current_user
  end

  def unsubscribed
    puts "*** backend PerUserAllUserChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend PerUserAllUserChannel receive ***"
  end
end
