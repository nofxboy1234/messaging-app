require 'rails_helper'

RSpec.describe Chat, type: :model do
  describe '#serialize' do
    it 'includes chat.messages, message.user, user.profile' do
      chat = create(:chat, :with_messages)
      json = chat.serialize

      expect(json.dig("messages", 0, "user", "profile")).not_to be_nil
    end
  end
end
