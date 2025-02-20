require 'rails_helper'

RSpec.describe Profile, type: :model do
  let(:viewing_user) do
    user = create(:user, email: 'user1@example.com', password: '123456')
    user.profile = create(:profile, username: 'user1')
    return user
  end

  let(:viewed_user) do
    user = create(:user, email: 'user2@example.com', password: '123456')
    user.profile = create(:profile, username: 'user2')
    return user
  end

  let(:profile) do
    viewed_user.profile
  end


  let(:json) do
    profile.serialize
  end

  describe '#picture' do
    it 'returns a gravatar url that points to the user profile picture' do
      expect(profile.picture).to start_with("https://www.gravatar.com/avatar/")
    end
  end

  describe '#show_data' do
    context 'when the viewing_user is friends with the viewed_user, as the receiver of the friend request' do
      let(:friendship) do
        create(:friendship, user: viewed_user, friend: viewing_user)
      end
      it 'returns a hash with data to show on a profile, relevant to the viewer, depending on the relationship to the viewed user' do
        show_data = {
          profile: profile.serialize,
          relationship: "friend",
          friendRequest: nil,
          friendship: friendship,
          chat: friendship.chat
        }

        expect(profile.show_data(viewing_user)).to eq(show_data)
      end
    end
  end

  describe '#serialize' do
    it 'includes the user' do
      expect(json.dig("user", "email")).to eq('user2@example.com')
    end

    it "includes the users' profile" do
      expect(json.dig("user", "profile", "username")).to eq('user2')
    end
  end
end
