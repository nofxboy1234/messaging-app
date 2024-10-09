class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  before_action :authenticate_user!

  # rescue_from StandardError, with: :inertia_error_page

  def after_sign_out_path_for(resource)
    puts "**** after_sign_out_path_for ****"
    new_user_session_path
  end

  # private

  # def inertia_error_page(exception)
  #   puts "**** inertia_error_page ****"
  #   raise exception if Rails.env.local?
  # end
end
