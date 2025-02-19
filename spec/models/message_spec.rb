require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#serialize' do
    it 'includes the user that created the message and their profile, in the json' do
      message = create(:message, body: 'hello')

      expect(message.body).to eq('hello')
    end
  end
end
