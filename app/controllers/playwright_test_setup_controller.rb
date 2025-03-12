class PlaywrightTestSetupController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!
  around_action :wrap_in_transaction, only: [ :seed ]

  def seed
    begin
      puts "***"
      puts "seed"
      puts "***"

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

      puts "***"
      puts "end of seed"
      puts "***"

      puts "*** All users"
      puts User.all.map(&:email)
      puts "*** /All users"

      render json: { status: "seeded" }
    rescue => error
      puts "*** error"
      p error.message
      puts "*** /error"
    end
  end

  private

  def wrap_in_transaction
    ActiveRecord::Base.transaction do
      yield
      # raise ActiveRecord::Rollback
    end
  end

  def create_user_with_profile(user_num)
    puts "***"
    puts "create_user_with_profile"
    puts "***"

    user = User.create!(email: "user#{user_num}@example.com",
                 password: "123456")

    Profile.create!(username: "user#{user_num}",
    picture: "",
    about: "",
    user:)

    user
  end

  def create_user_without_profile
    User.create!(email: Faker::Internet.email,
                password: "123456")
  end
end
