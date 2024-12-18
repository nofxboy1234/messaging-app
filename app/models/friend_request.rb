class FriendRequest < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: "User"

  def serialize
    as_json(include: [
      { user: { include: :profile } },
      { friend: { include: :profile } }
    ])
  end
end
