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
end
