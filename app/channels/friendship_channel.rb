class FriendshipChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend FriendshipChannel subscribed ***"
    current_user = User.find(params[:id])
    stream_for current_user
  end

  def unsubscribed
    puts "*** backend FriendshipChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend FriendshipChannel receive ***"
  end
end
