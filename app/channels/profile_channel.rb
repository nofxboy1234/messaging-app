class ProfileChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend ProfileChannel subscribed ***"
    stream_name = "ProfileChannel_#{params[:profile_id]}_#{params[:current_user_id]}"
    puts "*** stream name: #{stream_name} ***"
    stream_from(stream_name)

    # profile = User.find(params[:id])
    # stream_for profile
  end

  def unsubscribed
    puts "*** backend ProfileChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend ProfileChannel receive ***"
  end
end
