class AllUserChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend AllUserChannel subscribed ***"
    stream_from "AllUserChannel"
  end

  def unsubscribed
    puts "*** backend AllUserChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend AllUserChannel receive ***"
  end
end
