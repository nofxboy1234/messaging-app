namespace :playwright do
  task setup: :environment do
    Rails.env = "test"
    Rake::Task["db:schema:load"].invoke

    puts "setup test db"
  end

  task setup_test_data: :environment do
    include FactoryBot::Syntax::Methods

    Rails.env = "test"
    Rake::Task["db:schema:load"].invoke

    user = create(:user, :with_profile, email: "user1@example.com", password: "123456")

    for i in 1..3 do
      friend = create(:user, email: "user#{i + 1}@example.com", password: "123456")
      friend.profile = create(:profile, username: "user#{i + 1}", user: friend)
      friendship = create(:friendship, user:, friend:)
      friendship.chat = create(:chat, friendship:)
      friendship.chat.members << [ user, friend ]
    end

    friend = create(:user, email: "user5@example.com", password: "123456")
    friend.profile = create(:profile, username: "user5", user: friend)
    friendship = create(:friendship, user: friend, friend: user)
    friendship.chat = create(:chat, friendship:)
    friendship.chat.members << [ user, friend ]

    create(:message, body: "first message", chat: friendship.chat, user:)
    create_list(:message, 50, chat: friendship.chat, user: [ user, friend ].sample)
    create(:message, body: "middle message", chat: friendship.chat, user:)
    create_list(:message, 50, chat: friendship.chat, user: [ user, friend ].sample)
    create(:message, body: "last message", chat: friendship.chat, user:)

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
