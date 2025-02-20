require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#serialize' do
    let(:json) do
      user = create(:user, email: 'user1@example.com', password: '123456')
      user.profile = create(:profile, username: 'user1')
      message = create(:message, body: 'hello', user:)
      message.serialize
    end

    context 'when a message is sent by a user' do
      it 'includes the user that created the message' do
        expect(json.dig("user", "email")).to eq('user1@example.com')
      end

      it "includes the users' profile" do
        expect(json.dig("user", "profile", "username")).to eq('user1')
      end
    end
  end
end
