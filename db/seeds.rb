# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user1 = User.create!(email: 'user1@example.com', password: 'user1!@#$%^&')
user2 = User.create!(email: 'user2@example.com', password: 'user2!@#$%^&')
user3 = User.create!(email: 'user3@example.com', password: 'user3!@#$%^&')
user4 = User.create!(email: 'user4@example.com', password: 'user4!@#$%^&')
user5 = User.create!(email: 'user5@example.com', password: 'user5!@#$%^&')

Profile.create!(
                username: user1.email.split('@').first,
                picture: '',
                about: "Hello, I am #{user1.email.split('@').first}!",
                user_id: user1.id
                )
Profile.create!(
  username: user2.email.split('@').first,
  picture: '',
  about: "Hello, I am #{user2.email.split('@').first}!",
  user_id: user2.id
)

  Profile.create!(
  username: user3.email.split('@').first,
  picture: '',
  about: "Hello, I am #{user3.email.split('@').first}!",
  user_id: user3.id
)

Profile.create!(
  username: user4.email.split('@').first,
  picture: '',
  about: "Hello, I am #{user4.email.split('@').first}!",
  user_id: user4.id
)

Profile.create!(
  username: user5.email.split('@').first,
  picture: '',
  about: "Hello, I am #{user5.email.split('@').first}!",
  user_id: user5.id
)

user1.friends << user2

current_user = user1
@friend = user2
@friendship = current_user.friendships.where(user: @friend).or(current_user.friendships.where(friend: @friend)).take
chat1 = Chat.create!(
  name: "#{current_user.profile.username}_#{@friend.profile.username}",
  friendship: @friendship
)
chat1.members << [ current_user, @friend ]

Message.create!(body: 'Hello user2!', user_id: user1.id, chat_id: chat1.id)
Message.create!(body: 'Hello user1!', user_id: user2.id, chat_id: chat1.id)
