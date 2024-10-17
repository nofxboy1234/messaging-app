class RegistrationsController < ApplicationController
  skip_before_action :authenticate

  def new
    @user = User.new
    render inertia: "registrations/New", props: { user: @user }
  end

  def create
    @user = User.new(user_params)
    @user.build_profile(username: @user.email.split("@").first,
                        picture: "",
                        about: "")

    if @user.save
      session_record = @user.sessions.create!
      cookies.signed.permanent[:session_token] = { value: session_record.id, httponly: true }

      # send_email_verification
      redirect_to root_path, notice: "Welcome! You have signed up successfully"
    else
      render inertia: "registrations/New", props: { user: @user, errors: @user.errors, status: :unprocessable_entity }
      # render :new, status: :unprocessable_entity
    end
  end

  private
    def user_params
      params.permit(:email, :password, :password_confirmation)
    end

  # def send_email_verification
  #   UserMailer.with(user: @user).email_verification.deliver_later
  # end
end
