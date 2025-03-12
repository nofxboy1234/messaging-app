def create_user_with_profile(user_num)
  user = User.create!(email: "user#{user_num}@example.com",
               password: "123456")

  Profile.create!(username: "user#{user_num}",
  picture: "",
  about: "",
  user:)

  user
end

namespace :playwright do
  task setup: :environment do
    Rails.env = "test"
    Rake::Task["db:schema:load"].invoke

    puts "setup test db"
  end

  task setup_test_data: :environment do
    Rails.env = "test"
    Rake::Task["db:schema:load"].invoke

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
    rescue => error
      p "*** error"
      p error.message
      p "*** /error"
    end

    puts "setup test data"
  end

  task cleanup_test_data: :environment do
    Rails.env = "test"
    Rake::Task["db:schema:load"].invoke

    puts "cleanup test data"
  end

  task teardown: :environment do
    Rails.env = "test"
    Rake::Task["db:schema:load"].invoke

    puts "teardown test db"
  end
end
