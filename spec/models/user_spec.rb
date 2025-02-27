require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#all_friends' do
    # let(:friendship) do

    #   friendship
    # end
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
end
