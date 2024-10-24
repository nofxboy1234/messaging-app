class ApplicationController < ActionController::Base
  before_action :set_current_request_details
  before_action :authenticate

  inertia_share shared: {
    flash: -> { flash.to_hash },
    current_user: -> { Current.user },
    session: -> { Current.session },
    profile: -> { Current.user&.profile },
    chats: -> { Chat.all },
    users: -> {
      users = User.includes(:profile)
      users.as_json(include: :profile)
    }
  }

  private
    def authenticate
      if session_record = Session.find_by_id(cookies.signed[:session_token])
        Current.session = session_record
      else
        redirect_to sign_in_path
      end
    end

    def set_current_request_details
      Current.user_agent = request.user_agent
      Current.ip_address = request.ip
    end
end
