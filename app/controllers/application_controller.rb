class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  inertia_share shared: {
    flash: -> { flash.to_hash },
    current_user: -> { current_user },
    session: -> { user_session },
    profile: -> { current_user&.profile },
    chats: -> {
      mapped_chats = current_user&.friends&.includes(:profile)&.map do |friend|
        chat = current_user&.find_direct_message_chat_with(friend)
        { friend: friend.as_json(include: :profile), chat: chat }
      end

      mapped_chats&.sort { |chat_a, chat_b| chat_a[:friend]["profile"]["username"] <=> chat_b[:friend]["profile"]["username"] }
    },
    users: -> {
      User.includes(:profile).order("profiles.username").as_json(include: :profile)
    },
    friends: -> {
      return if !current_user

      friends = current_user.friends.includes(:profile)
      friends.as_json(include: :profile)
    }
  }
end
