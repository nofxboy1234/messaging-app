class FriendRequest < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: "User"

  scope :incoming_friend_requests, ->(user) { where(friend: user) }
end
