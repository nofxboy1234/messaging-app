class Chat < ApplicationRecord
  has_many :member_lists
  has_many :users, through: :member_lists
end
