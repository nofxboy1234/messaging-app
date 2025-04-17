class Chat < ApplicationRecord
  has_many :messages, dependent: :destroy

  has_many :memberships, class_name: "MemberList", dependent: :destroy
  has_many :members, through: :memberships, source: :user

  belongs_to :friendship

  def serialize
    as_json(include: [
        { messages: { include: { user: { include: :profile } } } },
        { members: { include: :profile } },
        :friendship
    ])
  end
end
