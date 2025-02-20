require 'rails_helper'

RSpec.describe Chat, type: :model do
  describe '#serialize' do
    it 'includes chat.messages in the json' do
      chat = create(:chat, :with_messages)
      json = chat.serialize

      expect(json.dig("messages").class).to eq(Array)
    end

    it 'includes chat.messages[index].user in the json' do
      chat = create(:chat, :with_messages)
      json = chat.serialize

      expect(json.dig("messages", 0, "user")).not_to be_nil
    end

    it 'includes chat.messages[index].user.profile in the json' do
      chat = create(:chat, :with_messages)
      json = chat.serialize

      expect(json.dig("messages", 0, "user", "profile")).not_to be_nil
    end
  end
end
