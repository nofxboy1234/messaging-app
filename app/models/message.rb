class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat

  def serialize
    as_json(include: { user: { include: :profile } })
  end
end
