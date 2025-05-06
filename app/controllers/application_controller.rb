class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  inertia_share do
    shared = {
      shared: {
        flash: -> { flash.to_hash }
      }
    }

    user_shared = {
      shared: {
        current_user: -> { current_user },
        profile: -> { current_user.profile },
        chats: -> {
          current_user.chats_with_friends
        },
        users: -> {
          User.includes(:profile).order("profiles.username").as_json(include: :profile)
        }
      }
    }

    user_signed_in? ? shared.deep_merge(user_shared) : shared
  end
end
