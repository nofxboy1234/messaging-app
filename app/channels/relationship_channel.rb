class RelationshipChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend RelationshipChannel subscribed ***"
    stream_name = "RelationshipChannel_#{params[:profile_id]}_#{params[:current_user_id]}"
    puts "*** stream name: #{stream_name} ***"
    stream_from(stream_name)
  end

  def unsubscribed
    puts "*** backend RelationshipChannel unsubscribed ***"
  end

  def receive(data)
    puts "*** backend RelationshipChannel receive ***"
  end
end
