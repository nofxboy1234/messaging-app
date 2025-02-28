require 'rails_helper'

RSpec.describe FriendRequest, type: :model do
  describe 'the user a friend_request is associated with' do
    context 'when a friend_request is created without a user' do
      it 'the friend_request is not saved' do
        friend_request = build(:friend_request, user: nil)
        friend_request.save
        expect(friend_request).not_to be_persisted
      end
    end

    context 'when a friend_request is created with a user' do
      it 'the friend_request is saved' do
        friend_request = build(:friend_request)
        friend_request.save
        expect(friend_request).to be_persisted
      end

      it 'friend_request.user returns the user' do
        user = create(:user)
        friend_request = build(:friend_request, user:)
        friend_request.save
        expect(friend_request.user).to be(user)
      end
    end
  end

  describe 'the friend a friend_request is associated with' do
    context 'when a friend_request is created without a friend' do
      it 'the friend_request is not saved' do
        friend_request = build(:friend_request, friend: nil)
        friend_request.save
        expect(friend_request).not_to be_persisted
      end
    end

    context 'when a friend_request is created with a friend' do
      it 'the friend_request is saved' do
        friend_request = build(:friend_request)
        friend_request.save
        expect(friend_request).to be_persisted
      end

      it 'friend_request.friend returns the friend' do
        friend = create(:user)
        friend_request = build(:friend_request, friend:)
        friend_request.save
        expect(friend_request.friend).to be(friend)
      end
    end
  end

  describe '#serialize' do
    let(:json) do
      user = create(:user, email: 'user1@example.com', password: '123456')
      user.profile = create(:profile, username: 'user1')
      user2 = create(:user, email: 'user2@example.com', password: '123456')
      user2.profile = create(:profile, username: 'user2')
      friend_request = create(:friend_request, user:, friend: user2)
      friend_request.serialize
    end

    context 'when there are 2 users: user1 and user2' do
      context 'when a friend request is sent from user1 to user2' do
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
