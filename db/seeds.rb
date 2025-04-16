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

for i in 1..5 do
  create_user_with_profile(i)
end

user1 = User.find(1)
user2 = User.find(2)
user3 = User.find(3)
user4 = User.find(4)
user5 = User.find(5)

@friend_request = FriendRequest.new(user: user1, friend: user2)
@friend_request.save

@friend_request = FriendRequest.new(user: user3, friend: user1)
@friend_request.save

@friendship = Friendship.new(user: user1, friend: user4)
chat = Chat.new
user = @friendship.user
friend = @friendship.friend
chat.members << [ user, friend ]
@friendship.chat = chat
@friendship.save

Message.create!(body: 'first message', chat:, user:)

for i in 1..50 do
  Message.create!(body: Faker::Lorem.sentence, chat:, user:)
  Message.create!(body: Faker::Lorem.sentence, chat:, user: friend)
end

Message.create!(body: 'middle message', chat:, user:)

for i in 1..50 do
  Message.create!(body: Faker::Lorem.sentence, chat:, user:)
  Message.create!(body: Faker::Lorem.sentence, chat:, user: friend)
end

Message.create!(body: 'last message', chat:, user:)

@friendship = Friendship.new(user: user5, friend: user1)
chat = Chat.new
user = @friendship.user
friend = @friendship.friend
chat.members << [ user, friend ]
@friendship.chat = chat
@friendship.save

@friendship = Friendship.new(user: user2, friend: user3)
chat = Chat.new
user = @friendship.user
friend = @friendship.friend
chat.members << [ user, friend ]
@friendship.chat = chat
@friendship.save
