require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#serialize' do
    context 'when a chat has 2 members, user1 and user2' do
      let(:json) do
        user = create(:user, email: 'user1@example.com', password: '123456')
        user.profile = create(:profile, username: 'user1')
        message = create(:message, body: 'hello', user:)
        message.serialize
      end

      context 'when a message is sent by a user with user.email: user1@example.com, profile.username: user1' do
        it 'includes the user that created the message' do
          expect(json.dig("user", "email")).to eq('user1@example.com')
        end

        it "includes the users' profile" do
          expect(json.dig("user", "profile", "username")).to eq('user1')
        end
      end
    end
  end
end
