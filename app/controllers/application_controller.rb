class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  inertia_share shared: {
    flash: -> { flash.to_hash },
    current_user: -> { current_user },
    session: -> { user_session },
    profile: -> { current_user&.profile },
    chats: -> {
      current_user&.chats_with_friends
    },
    users: -> {
      User.includes(:profile).order("profiles.username").as_json(include: :profile)
    },
    friends: -> {
      return if !current_user

      friends = current_user.all_friends.includes(:profile)
      friends.as_json(include: :profile)
    }
  }
end
