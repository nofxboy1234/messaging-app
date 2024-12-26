class ProfileChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend ProfileChannel subscribed ***"
    profile = Profile.find(params[:id])
    stream_for profile
  end

  def unsubscribed
    puts "*** backend ProfileChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend ProfileChannel receive ***"
  end
end
