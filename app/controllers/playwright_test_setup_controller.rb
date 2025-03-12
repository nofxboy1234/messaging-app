class PlaywrightTestSetupController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!

  def seed
    begin
      user = create_user_with_profile(1)

      for i in 1..3 do
        friend = create_user_with_profile(i + 1)
        friendship = Friendship.create!(user:, friend:)
        chat = Chat.create!(name: Faker::Lorem.characters(number: 3), friendship:)
        MemberList.create!(chat:, user: user)
        MemberList.create!(chat:, user: friend)
      end

      friend = create_user_with_profile(5)
      friendship = Friendship.create!(user:, friend:)
      chat = Chat.create!(name: Faker::Lorem.characters(number: 3), friendship:)
      MemberList.create!(chat:, user: user)
      MemberList.create!(chat:, user: friend)

      for i in 1..50 do
        Message.create!(body: Faker::Lorem.sentence, chat:, user:)
        Message.create!(body: Faker::Lorem.sentence, chat:, user: friend)
      end

      Message.create!(body: "last message", chat:, user:)

      render json: { status: "seeded" }
    rescue => error
      p "*** error"
      p error.message
      p "*** /error"
    end
  end

  private

  def create_user_with_profile(user_num)
    user = User.create!(email: "user#{user_num}@example.com",
                 password: "123456")

    Profile.create!(username: "user#{user_num}",
    picture: "",
    about: "",
    user:)

    user
  end
end
