require 'rails_helper'

RSpec.describe "friendships/index", type: :view do
  before(:each) do
    assign(:friendships, [
      Friendship.create!(
        user: nil,
        friend: nil
      ),
      Friendship.create!(
        user: nil,
        friend: nil
      )
    ])
  end

  it "renders a list of friendships" do
    render
    cell_selector = 'div>p'
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
  end
end
