require 'rails_helper'

RSpec.describe "friendships/edit", type: :view do
  let(:friendship) {
    Friendship.create!(
      user: nil,
      friend: nil
    )
  }

  before(:each) do
    assign(:friendship, friendship)
  end

  it "renders the edit friendship form" do
    render

    assert_select "form[action=?][method=?]", friendship_path(friendship), "post" do

      assert_select "input[name=?]", "friendship[user_id]"

      assert_select "input[name=?]", "friendship[friend_id]"
    end
  end
end
