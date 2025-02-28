require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'the user a message is associated with' do
    context 'when a message is created without a user' do
      it 'the message is not saved' do
        message = build(:message, user: nil)
        message.save
        expect(message).not_to be_persisted
      end
    end

    context 'when a message is created with a user' do
      it 'the message is saved' do
        message = build(:message)
        message.save
        expect(message).to be_persisted
      end

      it 'message.user returns the user' do
        user = create(:user)
        message = build(:message, user:)
        message.save
        expect(message.user).to be(user)
      end
    end
  end

  describe 'the chat a message is associated with' do
    context 'when a message is created without a chat' do
      it 'the message is not saved' do
        message = build(:message, chat: nil)
        message.save
        expect(message).not_to be_persisted
      end
    end

    context 'when a message is created with a chat' do
      it 'the message is saved' do
        message = build(:message)
        message.save
        expect(message).to be_persisted
      end

      it 'message.chat returns the chat' do
        chat = create(:chat)
        message = build(:message, chat:)
        message.save
        expect(message.chat).to be(chat)
      end
    end
  end

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
