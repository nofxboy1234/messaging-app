require 'rails_helper'

RSpec.describe MemberList, type: :model do
  describe 'the chat a member_list is associated with' do
    context 'when a member_list is created without a chat' do
      it 'the member_list is not saved' do
        member_list = build(:member_list, chat: nil)
        member_list.save
        expect(member_list).not_to be_persisted
      end
    end

    context 'when a member_list is created with a chat' do
      it 'the member_list is saved' do
        member_list = build(:member_list)
        member_list.save
        expect(member_list).to be_persisted
      end

      it 'member_list.chat returns the chat' do
        chat = create(:chat)
        member_list = build(:member_list, chat:)
        member_list.save
        expect(member_list.chat).to be(chat)
      end
    end
  end

  describe 'the user a member_list is associated with' do
    context 'when a member_list is created without a user' do
      it 'the member_list is not saved' do
        member_list = build(:member_list, user: nil)
        member_list.save
        expect(member_list).not_to be_persisted
      end
    end

    context 'when a member_list is created with a user' do
      it 'the member_list is saved' do
        member_list = build(:member_list)
        member_list.save
        expect(member_list).to be_persisted
      end

      it 'member_list.user returns the user' do
        user = create(:user)
        member_list = build(:member_list, user:)
        member_list.save
        expect(member_list.user).to be(user)
      end
    end
  end
end
