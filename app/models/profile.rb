class Profile < ApplicationRecord
  belongs_to :user

  def picture
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    "https://www.gravatar.com/avatar/#{hash}"
  end
end
