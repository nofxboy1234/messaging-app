# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    render inertia: "registrations/New", props: {}
  end

  # POST /resource
  def create
    super do |user|
      if user.errors.size.positive?
        redirect_to new_user_registration_url, inertia: { errors: user.errors }
        return
      else
        user.build_profile(username: user.email.split("@").first,
                           picture: "",
                           about: "")
        if user.save
          broadcast_create(user)
        else
          redirect_to new_user_registration_url, inertia: { errors: user.errors }
          return
        end
      end
    end
  end

  private

  def broadcast_create(user)
    broadcast_all_users(user)
  end

  def broadcast_all_users(user)
    ActionCable.server.broadcast("AllUserChannel", user.serialize)
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
