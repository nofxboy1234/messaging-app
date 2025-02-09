class ApplicationController < ActionController::Base
  inertia_share shared: {
    flash: -> { flash.to_hash },
    current_user: -> { User.find(1) },
    session: -> { Current.session },
    profile: -> { User.find(1).profile },
    chats: -> {
      mapped_chats = User.find(1)&.friends&.includes(:profile)&.map do |friend|
        chat = User.find(1)&.find_direct_message_chat_with(friend)
        { friend: friend.as_json(include: :profile), chat: chat }
      end

      mapped_chats&.sort { |chat_a, chat_b| chat_a[:friend]["profile"]["username"] <=> chat_b[:friend]["profile"]["username"] }
    },
    users: -> {
      User.includes(:profile).order("profiles.username").as_json(include: :profile)
    },
    friends: -> {
      return if !User.find(1)

      friends = User.find(1).friends.includes(:profile)
      friends.as_json(include: :profile)
    }
  }
end
