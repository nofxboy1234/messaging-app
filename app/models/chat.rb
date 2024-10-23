class Chat < ApplicationRecord
  has_many :messages, dependent: :destroy

  has_many :member_lists
  has_many :users, through: :member_lists, dependent: :destroy
end
