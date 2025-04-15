class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  has_many :friendships, dependent: :destroy
  has_many :friends,
    through: :friendships,
    source: :friend

  has_many :inverse_friendships, dependent: :destroy, class_name: "Friendship", foreign_key: :friend_id
  has_many :inverse_friends,
    through: :inverse_friendships,
    source: :user

  def all_friends
    User.joins("LEFT JOIN friendships ON users.id = friendships.friend_id OR users.id = friendships.user_id")
        .where("friendships.user_id = :id OR friendships.friend_id = :id", id: id)
        .where.not(id: id)
        .distinct
  end

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

  has_many :member_lists, dependent: :destroy
  has_many :chats, through: :member_lists

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

  def find_direct_message_chat_with(friend)
    chats.where(id: friend.chats.pluck(:id)).take
  end

  def chats_with_friends
    all_friends.includes(:profile).order(profiles: { username: :asc }).map do |friend|
      chat = find_direct_message_chat_with(friend)
      serialized_chat = chat.serialize
      serialized_chat["friend"] = friend.serialize
      serialized_chat
    end
  end

  def friendships_data
    all_friends.includes(:profile).map do |friend|
      chat = find_direct_message_chat_with(friend)
      friendship = chat.friendship

      {
        friend: friend.serialize,
        chat: chat,
        friendship: friendship
      }
    end
  end

  def chats_data
    all_friends.includes(:profile)&.map do |friend|
      chat = find_direct_message_chat_with(friend)

      {
        friend: friend.serialize,
        chat: chat
      }
    end
  end

  def friends_with?(user)
    all_friends.include?(user)
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
