require 'rails_helper'

RSpec.describe Chat, type: :model do
  describe 'the messages associated with a chat' do
    context 'when a chat is destroyed' do
      it 'the messages are also destroyed' do
        chat = create(:chat, :with_messages)
        expect(chat).to be_persisted
        expect(chat.messages.count).to be > 0

        chat.destroy!
        expect(chat).not_to be_persisted
        expect(chat.messages.count).to eq(0)
      end
    end
  end

  describe 'the memberships associated with a chat' do
    context 'when a chat is destroyed' do
      it 'the memberships are also destroyed' do
        user = create(:user, email: 'user1@example.com', password: '123456')
        user.profile = create(:profile, username: 'user1')
        user2 = create(:user, email: 'user2@example.com', password: '123456')
        user2.profile = create(:profile, username: 'user2')
        chat = create(:chat)
        chat.members << [ user, user2 ]
        expect(chat).to be_persisted
        expect(chat.memberships.count).to eq(2)

        chat.destroy!
        expect(chat).not_to be_persisted
        expect(chat.memberships.count).to eq(0)
      end
    end
  end

  describe 'the friendship a chat is associated with' do
    context 'when a chat is created without a friendship' do
      it 'the chat is not saved' do
        chat = build(:chat, friendship: nil)
        chat.save
        expect(chat).not_to be_persisted
      end
    end

    context 'when a chat is created with a friendship' do
      it 'the chat is saved' do
        chat = build(:chat)
        chat.save
        expect(chat).to be_persisted
      end

      it 'chat.friendship returns the friendship' do
        friendship = create(:friendship)
        chat = build(:chat, friendship:)
        chat.save
        expect(chat.friendship).to be(friendship)
      end
    end
  end

  describe '#serialize' do
    context 'when a chat has 2 members, user1 and user2' do
      let(:json) do
        chat = create(:chat)
        user = create(:user, email: 'user1@example.com', password: '123456')
        user.profile = create(:profile, username: 'user1')
        create(:message, body: 'hello', chat:, user:)
        user2 = create(:user, email: 'user2@example.com', password: '123456')
        user2.profile = create(:profile, username: 'user2')
        chat.members << [ user, user2 ]
        chat.serialize
      end

      context 'when a chat has 1 message sent by a user' do
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

      it 'includes the members of the chat' do
        expect(json.dig("members").length).to eq(2)
      end

      it "includes the profile of user1" do
        expect(json.dig("members", 0, "profile", "username")).to eq('user1')
      end

      it "includes the profile of user2" do
        expect(json.dig("members", 1, "profile", "username")).to eq('user2')
      end
    end
  end
end
