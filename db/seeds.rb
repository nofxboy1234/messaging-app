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
                picture: 'https://example.com/pictures/user1',
                about: "Hello, I am #{user1.email.split('@').first}!",
                user_id: user1.id
                )
Profile.create!(
  username: user2.email.split('@').first,
  picture: 'https://example.com/pictures/user2',
  about: "Hello, I am #{user2.email.split('@').first}!",
  user_id: user2.id
)

  Profile.create!(
  username: user3.email.split('@').first,
  picture: 'https://example.com/pictures/user3',
  about: "Hello, I am #{user3.email.split('@').first}!",
  user_id: user3.id
)

Profile.create!(
  username: user4.email.split('@').first,
  picture: 'https://example.com/pictures/user4',
  about: "Hello, I am #{user4.email.split('@').first}!",
  user_id: user4.id
)

Profile.create!(
  username: user5.email.split('@').first,
  picture: 'https://example.com/pictures/user5',
  about: "Hello, I am #{user5.email.split('@').first}!",
  user_id: user5.id
)

# chat1 = Chat.create!(name: 'Chat1')
# chat1.members << [ user1, user2 ]

# message1 = Message.create!(body: 'Hello user2!', user_id: user1.id, chat_id: chat1.id)
# message2 = Message.create!(body: 'Hello user1!', user_id: user2.id, chat_id: chat1.id)

# user1.friends << user2

user1.outgoing_friends << user2
user4.outgoing_friends << user1
user3.outgoing_friends << user1
