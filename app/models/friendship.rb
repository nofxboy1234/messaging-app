class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: "User"
  has_one :chat, dependent: :destroy
end
