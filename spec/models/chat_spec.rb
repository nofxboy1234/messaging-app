require 'rails_helper'

RSpec.describe Chat, type: :model do
  describe '#serialize' do
    context 'when a chat has 1 message sent by a user with email: user1@example.com, username: user1' do
      let(:json) do
        chat = create(:chat, :with_messages)
        chat.serialize
      end

      it 'includes chat.messages array with length of 1' do
        expect(json.dig("messages").class).to eq(Array)
      end

      it 'includes chat.messages[index].user in the json' do
        expect(json.dig("messages", 0, "user")).not_to be_nil
      end

      it 'includes chat.messages[index].user.profile in the json' do
        expect(json.dig("messages", 0, "user", "profile")).not_to be_nil
      end
    end
  end
end
