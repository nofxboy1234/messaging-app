require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'users must have valid emails and passwords' do
    context 'when a user has valid email and password' do
      it 'the user is saved successfully' do
        user = create(:user)

        expect(user).to be_persisted
      end
    end

    context 'when a user has no email' do
      it 'the user is not saved' do
        user = build(:user, email: nil)
        user.save
        expect(user).not_to be_persisted
      end

      it 'the user has a blank email error' do
        user = build(:user, email: nil)
        user.save
        expect(user.errors.full_messages).to eq([ "Email can't be blank" ])
      end
    end

    context 'when a user has an invalid email' do
      it 'the user is not saved' do
        user = build(:user, email: '923874728^^sdifu')
        user.save
        expect(user).not_to be_persisted
      end

      it 'the user has an invalid email error' do
        user = build(:user, email: '923874728^^sdifu')
        user.save
        expect(user.errors.full_messages).to eq([ "Email is invalid" ])
      end
    end

    context 'when a user has a password that is too short' do
      it 'the user is not saved' do
        user = build(:user, password: '123')
        user.save
        expect(user).not_to be_persisted
      end

      it 'the user has a password length error' do
        user = build(:user, password: '123')
        user.save
        expect(user.errors.full_messages).to eq([ "Password is too short (minimum is 6 characters)" ])
      end
    end
  end

  describe '#all_friends' do
    context 'when a user is friends with a direct and indirect friend' do
      it 'returns all direct and inverse friends' do
        user1 = create(:user, email: 'user1@example.com')
        user2 = create(:user, email: 'user2@example.com')
        user3 = create(:user, email: 'user3@example.com')

        create(:friendship, user: user1, friend: user2)
        create(:friendship, user: user3, friend: user1)

        expected = [ 'user2@example.com', 'user3@example.com' ]
        expect(user1.all_friends.map(&:email)).to eq(expected)
      end
    end

    context 'when a user is friends with another user directly and indirectly' do
      it 'returns the friend once' do
        user1 = create(:user, email: 'user1@example.com')
        user2 = create(:user, email: 'user2@example.com')

        create(:friendship, user: user1, friend: user2)
        create(:friendship, user: user2, friend: user1)

        expected = [ 'user2@example.com' ]
        expect(user1.all_friends.map(&:email)).to eq(expected)
      end
    end

    context 'when a user is friends with a direct and indirect friend' do
      it 'the user is not included in the friends' do
        user1 = create(:user, email: 'user1@example.com')
        user2 = create(:user, email: 'user2@example.com')
        user3 = create(:user, email: 'user3@example.com')

        create(:friendship, user: user1, friend: user2)
        create(:friendship, user: user3, friend: user1)

        expected = [ 'user2@example.com', 'user3@example.com' ]
        expect(user1.all_friends.map(&:email)).not_to include('user1@example.com')
      end
    end

    context 'when a user has pending friend requests' do
      it 'the pending friends are not returned' do
        user1 = create(:user, email: 'user1@example.com')
        user2 = create(:user, email: 'user2@example.com')
        user3 = create(:user, email: 'user3@example.com')

        create(:friend_request, user: user1, friend: user2)
        create(:friend_request, user: user3, friend: user1)

        expect(user1.all_friends.map(&:email)).not_to include('user2@example.com')
        expect(user1.all_friends.map(&:email)).not_to include('user3@example.com')
      end
    end


    context 'when a user has no friends' do
      it 'returns an empty active record relation' do
        user1 = create(:user, email: 'user1@example.com')

        expect(user1.all_friends).to be_empty
      end
    end
  end

  describe 'friends association' do
    context 'when a user is the :user in a friendship' do
      it 'returns the other users that are considered the :friend' do
        user1 = create(:user, email: 'user1@example.com')
        user2 = create(:user, email: 'user2@example.com')
        user3 = create(:user, email: 'user3@example.com')

        create(:friendship, user: user1, friend: user2)
        create(:friendship, user: user3, friend: user1)

        expected = [ 'user2@example.com' ]
        expect(user1.friends.map(&:email)).to eq(expected)
      end
    end
  end

  describe 'inverse_friends association' do
    context 'when a user is the :friend in a friendship' do
      it 'returns the other users that are considered the :user' do
        user1 = create(:user, email: 'user1@example.com')
        user2 = create(:user, email: 'user2@example.com')
        user3 = create(:user, email: 'user3@example.com')

        create(:friendship, user: user1, friend: user2)
        create(:friendship, user: user3, friend: user1)

        expected = [ 'user3@example.com' ]
        expect(user1.inverse_friends.map(&:email)).to eq(expected)
      end
    end
  end

  describe 'the profile associated with a user' do
    context 'when a user is destroyed' do
      it 'the profile is also destroyed' do
        user = create(:user, :with_profile)
        expect(user).to be_persisted
        expect(user.profile).to be_persisted

        user.destroy!
        expect(user).not_to be_persisted
        expect(user.profile).not_to be_persisted
      end
    end
  end

  describe 'the friendships associated with a user' do
    context 'when a user is destroyed' do
      it 'the friendships are also destroyed' do
        user = create(:user, :with_friendships)
        expect(user).to be_persisted
        expect(user.friendships.count).to be > 0

        user.destroy!
        expect(user).not_to be_persisted
        expect(user.friendships.count).to eq(0)
      end
    end
  end

  describe 'the inverse friendships associated with a user' do
    context 'when a user is destroyed' do
      it 'the inverse friendships are also destroyed' do
        user = create(:user, :with_inverse_friendships)
        expect(user).to be_persisted
        expect(user.inverse_friendships.count).to be > 0

        user.destroy!
        expect(user).not_to be_persisted
        expect(user.inverse_friendships.count).to eq(0)
      end
    end
  end

  describe 'the incoming friend requests associated with a user' do
    context 'when a user is destroyed' do
      it 'the outgoing friend requests are also destroyed' do
        user = create(:user, :with_outgoing_friend_requests)
        expect(user).to be_persisted
        expect(user.outgoing_friend_requests.count).to be > 0

        user.destroy!
        expect(user).not_to be_persisted
        expect(user.outgoing_friend_requests.count).to eq(0)
      end
    end
  end

  describe 'the incoming friend requests associated with a user' do
    context 'when a user is destroyed' do
      it 'the incoming friend requests are also destroyed' do
        user = create(:user, :with_incoming_friend_requests)
        expect(user).to be_persisted
        expect(user.incoming_friend_requests.count).to be > 0

        user.destroy!
        expect(user).not_to be_persisted
        expect(user.incoming_friend_requests.count).to eq(0)
      end
    end
  end

  describe 'the messages associated with a user' do
    context 'when a user is destroyed' do
      it 'the messages are also destroyed' do
        user = create(:user, :with_messages)
        expect(user).to be_persisted
        expect(user.messages.count).to be > 0

        user.destroy!
        expect(user).not_to be_persisted
        expect(user.messages.count).to eq(0)
      end
    end
  end

  describe 'the chat memberships associated with a user' do
    context 'when a user is destroyed' do
      it 'the chat memberships are also destroyed' do
        user = create(:user, :with_member_lists)
        expect(user).to be_persisted
        expect(user.member_lists.count).to be > 0

        user.destroy!
        expect(user).not_to be_persisted
        expect(user.member_lists.count).to eq(0)
      end
    end
  end
end
