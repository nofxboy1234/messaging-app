require 'rails_helper'

RSpec.describe Profile, type: :model do
  let(:profile) do
    user = create(:user, email: 'user1@example.com', password: '123456')
    user.profile = create(:profile, username: 'user1')
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
  end

  describe '#serialize' do
    it 'includes the user' do
      expect(json.dig("user", "email")).to eq('user1@example.com')
    end

    it "includes the users' profile" do
      expect(json.dig("user", "profile", "username")).to eq('user1')
    end
  end
end
