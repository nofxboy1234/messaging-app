# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

def create_user_with_profile(user_num)
  User.create(email: "user#{user_num}@example.com",
              password: "123456",
              profile: Profile.create(username: "user#{user_num}",
                                      picture: "",
                                      about: ""))
end

def create_user_without_profile
  User.create(email: Faker::Internet.email,
              password: "123456")
end

user = create_user_with_profile(1)

for i in 1..3 do
  friend = create_user_with_profile(i + 1)
  friendship = Friendship.create(user:, friend:)
  chat = Chat.create(name: Faker::Lorem.characters(number: 3))
  chat.members << [ user, friend ]
  friendship.chat = chat
end

friend = create_user_with_profile(5)
friendship = Friendship.create(user: friend, friend: user)
chat = Chat.create(name: Faker::Lorem.characters(number: 3))
chat.members << [ user, friend ]
friendship.chat = chat

for i in 1..50 do
  Message.create!(body: Faker::Lorem.sentence, chat:, user:)
  Message.create!(body: Faker::Lorem.sentence, chat:, user: friend)
end
