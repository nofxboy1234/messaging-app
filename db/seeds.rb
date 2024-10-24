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


chat1 = Chat.create!(name: 'Chat1')
chat1.users << [ user1, user2 ]

message1 = Message.create!(body: 'Hello user2!', user_id: user1.id, chat_id: chat1.id)
message2 = Message.create!(body: 'Hello user1!', user_id: user2.id, chat_id: chat1.id)
