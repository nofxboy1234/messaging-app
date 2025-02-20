require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe '#picture' do
    let(:profile) do
      create(:profile)
    end

    it 'returns a gravatar url that points to the user profile picture' do
      expect(profile.picture).to start_with("https://www.gravatar.com/avatar/")
    end
  end

  describe '#serialize' do
    let(:json) do
      user = create(:user, email: 'user1@example.com', password: '123456')
      user.profile = create(:profile, username: 'user1')
      user.profile.serialize
    end

    it 'includes the user' do
      expect(json.dig("user", "email")).to eq('user1@example.com')
    end

    it "includes the users' profile" do
      expect(json.dig("user", "profile", "username")).to eq('user1')
    end
  end
end
