class Profile < ApplicationRecord
  belongs_to :user

  def picture
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    "https://www.gravatar.com/avatar/#{hash}"
  end

  def show_data(target_user)
    relationship = nil
    friend_request = nil
    friendship = nil
    chat = nil

    if target_user.has_friend_as_sender?(user)
      relationship = "friend"
      friendship = target_user.friendships.find_by(friend: user)
      chat = target_user.find_direct_message_chat_with(user)
    elsif target_user.has_friend_as_receiver?(user)
      relationship = "friend"
      friendship = target_user.friendships.find_by(user: user)
      chat = target_user.find_direct_message_chat_with(user)
    elsif target_user.has_outgoing_friend?(user)
      relationship = "outgoingRequest"
      friend_request = target_user.outgoing_friend_requests.find_by(friend: user)
    elsif target_user.has_incoming_friend?(user)
      relationship = "incomingRequest"
      friend_request = target_user.incoming_friend_requests.find_by(user: user)
    else
      relationship = "stranger"
    end

    {
      profile: serialize,
      relationship: relationship,
      friendRequest: friend_request&.serialize,
      friendship: friendship,
      chat: chat
    }
  end

  def serialize
    as_json(include: { user: { include: :profile } })
  end
end
