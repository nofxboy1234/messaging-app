class Chat < ApplicationRecord
  has_many :messages, dependent: :destroy

  has_many :memberships, class_name: "MemberList"
  has_many :members, through: :memberships, source: :user, dependent: :destroy

  belongs_to :friendship
end
