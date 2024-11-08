require 'rails_helper'

RSpec.describe "friendships/new", type: :view do
  before(:each) do
    assign(:friendship, Friendship.new(
      user: nil,
      friend: nil
    ))
  end

  it "renders new friendship form" do
    render

    assert_select "form[action=?][method=?]", friendships_path, "post" do

      assert_select "input[name=?]", "friendship[user_id]"

      assert_select "input[name=?]", "friendship[friend_id]"
    end
  end
end
