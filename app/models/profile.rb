class Profile < ApplicationRecord
  belongs_to :user

  def picture
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    "https://www.gravatar.com/avatar/#{hash}"
  end

  def show_data(target_user)
    if target_user.friends_with?(user)
      relationship = "friend"
      chat = target_user.find_direct_message_chat_with(user)
      friendship = chat.friendship
    elsif target_user.has_outgoing_friend?(user)
      relationship = "outgoingRequest"
      friend_request = target_user.outgoing_friend_requests
                                  .includes(friend: [ :profile ])
                                  .order("profiles.username")
                                  .find_by(friend: user)
    elsif target_user.has_incoming_friend?(user)
      relationship = "incomingRequest"
      friend_request = target_user.incoming_friend_requests
                                  .includes(friend: [ :profile ])
                                  .order("profiles.username")
                                  .find_by(user: user)
    else
      relationship = "stranger"
    end

    {
      profile: serialize,
      relationship: relationship,
      friendRequest: friend_request&.serialize,
      friendship: friendship,
      chat: chat&.serialize
    }
  end

  def serialize
    as_json(include: { user: { include: :profile } })
  end
end
