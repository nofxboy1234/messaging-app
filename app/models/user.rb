class User < ApplicationRecord
  def friends_with?(user)
    Current.user.friends.include?(user)
  end

  def has_outgoing_friend?(user)
    Current.user.outgoing_friends.include?(user)
  end

  def has_incoming_friend?(user)
    Current.user.incoming_friends.include?(user)
  end

  def find_direct_message_chat_with(friend)
    current_user = Current.user
    mutual_chats = current_user.chats.to_a.intersection(friend.chats.to_a)
    mutual_chats.find { |chat| chat.members.count === 2 }
  end

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

  def profile_picture
    email_address = email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    "https://www.gravatar.com/avatar/#{hash}"
  end

  has_secure_password

  generates_token_for :email_verification, expires_in: 2.days do
    email
  end

  generates_token_for :password_reset, expires_in: 20.minutes do
    password_salt.last(10)
  end


  has_many :sessions, dependent: :destroy
  has_many :recovery_codes, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_one :profile, dependent: :destroy

  has_many :member_lists
  has_many :chats, through: :member_lists, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, allow_nil: true, length: { minimum: 12 }
  validates :password, not_pwned: { message: "might easily be guessed" }

  normalizes :email, with: -> { _1.strip.downcase }

  before_validation if: :email_changed?, on: :update do
    self.verified = false
  end

  before_validation on: :create do
    self.otp_secret = ROTP::Base32.random
  end

  after_update if: :password_digest_previously_changed? do
    sessions.where.not(id: Current.session).delete_all
  end
end
