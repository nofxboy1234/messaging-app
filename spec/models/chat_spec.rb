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

      it 'includes a messages array with length of 1' do
        expect(json.dig("messages").length).to eq(1)
      end

      it 'includes the user that created the message' do
        expect(json.dig("messages", 0, "user", "email")).to eq('user1@example.com')
      end

      it "includes the users' profile" do
        expect(json.dig("messages", 0, "user", "profile", "username")).to eq('user1')
      end
    end
  end
end
