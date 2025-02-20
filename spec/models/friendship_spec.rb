require 'rails_helper'

RSpec.describe Friendship, type: :model do
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
