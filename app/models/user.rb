class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable
  has_many :friendships,
  ->(user) {
    friendships = Friendship.unscope(where: :user_id)
    query1 = friendships.where(user_id: user.id) # {1}
    query2 = Friendship.where(friend_id: user.id) # {2}
    query1.or(query2)
  },
  dependent: :destroy

  # SELECT "friendships".*
  # FROM "friendships"
  # WHERE ({1}"friendships"."user_id" = 1{1} {2}OR "friendships"."friend_id" = 1{2})

  has_many :friends,
  ->(user) {
    User.joins("OR users.id = friendships.user_id") # {3}
      .where.not(id: user.id) # {4}
  },
  through: :friendships

  has_many :friendships_as_sender,
  class_name: "Friendship",
  foreign_key: "user_id",
  dependent: :destroy

  has_many :friends_as_sender,
  through: :friendships_as_sender,
  source: :friend

  has_many :friendships_as_receiver,
  class_name: "Friendship",
  foreign_key: "friend_id",
  dependent: :destroy

  has_many :friends_as_receiver,
  through: :friendships_as_receiver,
  source: :user

  # SELECT "users".*
  # FROM "users"
  # INNER JOIN "friendships"
  # ON "users"."id" = "friendships"."friend_id" {3}OR users.id = friendships.user_id{3}
  # WHERE ({1}"friendships"."user_id" = 1{1} {2}OR "friendships"."friend_id" = 1{2})
  # {4}AND "users"."id" != 1{4}

  has_many :outgoing_friend_requests,
  class_name: "FriendRequest",
  foreign_key: "user_id",
  dependent: :destroy

  has_many :outgoing_friends,
  through: :outgoing_friend_requests,
  source: :friend

  has_many :incoming_friend_requests,
  class_name: "FriendRequest",
  foreign_key: "friend_id",
  dependent: :destroy

  has_many :incoming_friends,
  through: :incoming_friend_requests,
  source: :user

  has_many :messages, dependent: :destroy
  has_one :profile, dependent: :destroy

  has_many :member_lists
  has_many :chats, through: :member_lists, dependent: :destroy

  def friend_requests
    {
      outgoing_friend_requests: outgoing_friend_requests.includes(friend: [ :profile ]).order("profiles.username").map do |friend_request|
        friend_request.serialize
      end,
      incoming_friend_requests: incoming_friend_requests.includes(user: [ :profile ]).order("profiles.username").map do |friend_request|
        friend_request.serialize
      end
    }
  end

  def find_friendship_with(friend)
    friendships.where(user: friend).or(friendships.where(friend: friend)).take
  end

  def find_direct_message_chat_with(friend)
    chats.where(id: friend.chats.pluck(:id)).take
  end

  def friendships_data
    friends.includes(:profile).map do |friend|
      chat = find_direct_message_chat_with(friend)
      friendship = find_friendship_with(friend)

      {
        friend: friend.serialize,
        chat: chat,
        friendship: friendship
      }
    end
  end

  def chats_data
    friends.includes(:profile)&.map do |friend|
      chat = find_direct_message_chat_with(friend)

      {
        friend: friend.serialize,
        chat: chat
      }
    end
  end

  def has_friend_as_sender?(friend)
    friends_as_sender.include?(friend)
  end

  def has_friend_as_receiver?(friend)
    friends_as_receiver.include?(friend)
  end


  def has_outgoing_friend?(friend)
    outgoing_friends.include?(friend)
  end

  def has_incoming_friend?(friend)
    incoming_friends.include?(friend)
  end

  def serialize
    as_json(include: :profile)
  end
end
