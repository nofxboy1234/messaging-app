class ApplicationController < ActionController::Base
  before_action :set_current_request_details
  before_action :authenticate

  inertia_share shared: {
    flash: -> { flash.to_hash },
    current_user: -> { Current.user },
    session: -> { Current.session },
    profile: -> { Current.user&.profile },
    chats: -> {
      mapped_chats = Current.user&.friends&.includes(:profile)&.map do |friend|
        chat = Current.user&.find_direct_message_chat_with(friend)
        { friend: friend.as_json(include: :profile), chat: chat }
      end

      mapped_chats.sort { |chat_a, chat_b| chat_a[:friend]["profile"]["username"] <=> chat_b[:friend]["profile"]["username"] }
    },
    users: -> {
      User.includes(:profile).order("profiles.username").as_json(include: :profile)
    },
    friends: -> {
      return if !Current.user

      friends = Current.user.friends.includes(:profile)
      friends.as_json(include: :profile)
    }
  }

  private
    def authenticate
      if session_record = Session.find_by_id(cookies.signed[:session_token])
        Current.session = session_record
      else
        redirect_to new_session_path
      end
    end

    def set_current_request_details
      Current.user_agent = request.user_agent
      Current.ip_address = request.ip
    end
end
