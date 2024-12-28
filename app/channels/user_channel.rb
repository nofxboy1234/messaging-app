class UserChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend UserChannel subscribed ***"
    current_user = User.find(params[:id])
    stream_for current_user
  end

  def unsubscribed
    puts "*** backend UserChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend UserChannel receive ***"
  end
end
