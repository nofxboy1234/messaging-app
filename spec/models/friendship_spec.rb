require 'rails_helper'

RSpec.describe Friendship, type: :model do
  describe 'the user a friendship is associated with' do
    context 'when a friendship is created without a user' do
      it 'the friendship is not saved' do
        friendship = build(:friendship, user: nil)
        friendship.save
        expect(friendship).not_to be_persisted
      end
    end

    context 'when a friendship is created with a user' do
      it 'the friendship is saved' do
        friendship = build(:friendship)
        friendship.save
        expect(friendship).to be_persisted
      end

      it 'friendship.user returns the user' do
        user = create(:user)
        friendship = build(:friendship, user:)
        friendship.save
        expect(friendship.user).to be(user)
      end
    end
  end

  describe 'the friend a friendship is associated with' do
    context 'when a friendship is created without a friend' do
      it 'the friendship is not saved' do
        friendship = build(:friendship, friend: nil)
        friendship.save
        expect(friendship).not_to be_persisted
      end
    end

    context 'when a friendship is created with a friend' do
      it 'the friendship is saved' do
        friendship = build(:friendship)
        friendship.save
        expect(friendship).to be_persisted
      end

      it 'friendship.friend returns the friend' do
        friend = create(:user)
        friendship = build(:friendship, friend:)
        friendship.save
        expect(friendship.friend).to be(friend)
      end
    end
  end

  describe 'the chat associated with a friendship' do
    context 'when a friendship is destroyed' do
      it 'the chat is also destroyed' do
        friendship = create(:friendship, :with_chat)

        expect(friendship).to be_persisted
        expect(friendship.chat).to be_persisted

        friendship.destroy!

        expect(friendship).not_to be_persisted
        expect(friendship.chat).not_to be_persisted
      end
    end
  end

  describe '#serialize' do
    let(:json) do
      user = create(:user, email: 'user1@example.com', password: '123456')
      user.profile = create(:profile, username: 'user1')
      user2 = create(:user, email: 'user2@example.com', password: '123456')
      user2.profile = create(:profile, username: 'user2')
      friendship = create(:friendship, user:, friend: user2)
      friendship.serialize
    end

    context 'when there are 2 users: user1 and user2' do
      context 'when they are friends' do
        it 'includes user1 as the user' do
          expect(json.dig("user", "email")).to eq('user1@example.com')
        end

        it 'includes the profile of user1' do
          expect(json.dig("user", "profile", "username")).to eq('user1')
        end


        it 'includes user2 as the friend' do
          expect(json.dig("friend", "email")).to eq('user2@example.com')
        end

        it 'includes the profile of user2' do
          expect(json.dig("friend", "profile", "username")).to eq('user2')
        end
      end
    end
  end
end
