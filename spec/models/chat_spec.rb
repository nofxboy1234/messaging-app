require 'rails_helper'

RSpec.describe Chat, type: :model do
  describe '#serialize' do
    context 'when a chat has 1 message sent by a user with user.email: user1@example.com, profile.username: user1' do
      let(:json) do
        chat = create(:chat)
        user = create(:user, email: 'user1@example.com', password: '123456')
        user.profile = create(:profile, username: 'user1')
        create(:message, body: 'hello', chat:, user:)
        chat.serialize
      end

      it 'includes messages array with length of 1' do
        expect(json.dig("messages").length).to eq(1)
      end

      xit 'includes chat.messages[index].user in the json' do
        expect(json.dig("messages", 0, "user")).not_to be_nil
      end

      xit 'includes chat.messages[index].user.profile in the json' do
        expect(json.dig("messages", 0, "user", "profile")).not_to be_nil
      end
    end
  end
end
