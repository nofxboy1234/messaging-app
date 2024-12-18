class Profile < ApplicationRecord
  belongs_to :user

  def picture
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    "https://www.gravatar.com/avatar/#{hash}"
  end

  def show_data
    if Current.user.friends_with?(user)
      relationship = "friend"
      friendship = Current.user.friendships.find_by(friend: user)
      chat = Current.user.find_direct_message_chat_with(user)
    elsif Current.user.has_outgoing_friend?(user)
      relationship = "outgoingRequest"
      friend_request = Current.user.outgoing_friend_requests.find_by(friend: user)
    elsif Current.user.has_incoming_friend?(user)
      relationship = "incomingRequest"
      friend_request = Current.user.incoming_friend_requests.find_by(user: user)
    else
      relationship = "stranger"
    end

    {
      initialProfile: serialize,
      initialRelationship: relationship,
      initialFriendRequest: friend_request&.serialize,
      initialFriendship: friendship,
      initialChat: chat
    }
  end

  def serialize
    as_json(include: { user: { include: :profile } })
  end
end
