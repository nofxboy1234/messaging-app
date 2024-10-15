class MessageChannel < ApplicationCable::Channel
  def subscribed
    puts "*** backend message channel subscribed"
    stream_from "message"
  end

  def unsubscribed
    puts "*** backend message channel unsubscribed"

    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    data["message"]["user_id"] = "guest"
    ActionCable.server.broadcast("message", data)
  end
end
