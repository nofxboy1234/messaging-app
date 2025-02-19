FactoryBot.define do
  factory :chat do
    name { Faker::Lorem.characters(number: 3) }
    friendship

    trait :with_messages do
      after(:create) do |chat|
        create_list(:message, 3, chat: chat)
      end
    end
  end
end

FactoryBot.define do
  factory :friend_request do
    user
    friend
  end
end

FactoryBot.define do
  factory :friendship do
    user
    friend
  end
end

FactoryBot.define do
  factory :member_list do
    chat
    user
  end
end

FactoryBot.define do
  factory :message do
    body { Faker::Lorem.sentence }

    chat
    user
  end
end

FactoryBot.define do
  factory :profile do
    username { Faker::Internet.username }
    picture { "" }
    about { "" }

    user
  end
end

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }

    factory :friend
  end
end
