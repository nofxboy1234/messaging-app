FactoryBot.define do
  factory :chat do
    name { Faker::Lorem.characters(number: 3) }
    friendship

    trait :with_messages do
      after(:create) do |chat|
        chat.members << [ chat.friendship.user, chat.friendship.friend ]
        chat.members.each { |user| user.profile = create(:profile, user:) }

        create_list(:message, 3, chat:, user: chat.members.sample)
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

    trait :with_profile do
      after(:create) do |user|
        user.profile = create(:profile, user:)
      end
    end

    trait :with_friendships do
      after(:create) do |user|
        friend1 = create(:user)
        friend2 = create(:user)
        create(:friendship, user:, friend: friend1)
        create(:friendship, user:, friend: friend2)
      end
    end

    trait :with_inverse_friendships do
      after(:create) do |user|
        friend1 = create(:user)
        friend2 = create(:user)
        create(:friendship, user: friend1, friend: user)
        create(:friendship, user: friend2, friend: user)
      end
    end

    trait :with_outgoing_friend_requests do
      after(:create) do |user|
        friend1 = create(:user)
        friend2 = create(:user)
        create(:friend_request, user:, friend: friend1)
        create(:friend_request, user:, friend: friend2)
      end
    end

    trait :with_incoming_friend_requests do
      after(:create) do |user|
        friend1 = create(:user)
        friend2 = create(:user)
        create(:friend_request, user: friend1, friend: user)
        create(:friend_request, user: friend2, friend: user)
      end
    end

    trait :with_messages do
      after(:create) do |user|
        friend1 = create(:user)
        friendship = create(:friendship, user:, friend: friend1)
        chat = create(:chat, friendship:)
        create_list(:message, 3, user:, chat:)
      end
    end

    trait :with_member_lists do
      after(:create) do |user|
        friend1 = create(:user)
        friendship = create(:friendship, user:, friend: friend1)
        chat = create(:chat, friendship:)
        chat.members << [ user, friend1 ]
      end
    end

    factory :friend
  end
end
