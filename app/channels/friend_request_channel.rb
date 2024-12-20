class FriendRequestChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend FriendRequestChannel subscribed ***"
    current_user = User.find(params[:id])
    stream_for current_user
  end

  def unsubscribed
    puts "*** backend FriendRequestChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend FriendRequestChannel receive ***"
  end
end
