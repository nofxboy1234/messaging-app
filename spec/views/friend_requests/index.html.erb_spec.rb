require 'rails_helper'

RSpec.describe "friend_requests/index", type: :view do
  before(:each) do
    assign(:friend_requests, [
      FriendRequest.create!(
        user: nil,
        friend: nil
      ),
      FriendRequest.create!(
        user: nil,
        friend: nil
      )
    ])
  end

  it "renders a list of friend_requests" do
    render
    cell_selector = 'div>p'
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
  end
end
