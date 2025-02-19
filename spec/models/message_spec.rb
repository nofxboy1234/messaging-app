require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#serialize' do
    it 'includes the user that created the message in the json' do
      message = create(:message)
      json = message.serialize

      expect(json).to include("user")
    end

    it 'includes the profile of the user that created the message in the json' do
      message = create(:message)
      message.user.profile = create(:profile)
      json = message.serialize
      user = json["user"]

      expect(user).to include("profile")
    end
  end
end
