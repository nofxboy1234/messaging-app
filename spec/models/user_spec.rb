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

    context 'when a user has no friends' do
      it 'returns an empty active record relation' do
        user1 = create(:user, email: 'user1@example.com')

        expected = []
        expect(user1.all_friends).to eq(expected)
      end
    end
  end

  describe '#friends' do
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

  describe '#inverse_friends' do
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
end
