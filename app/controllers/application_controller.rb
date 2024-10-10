class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  before_action :authenticate_user!
  inertia_share flash: -> { flash.to_hash }

  def after_sign_out_path_for(resource)
    new_user_session_path
  end
end
