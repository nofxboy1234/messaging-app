require 'rails_helper'

RSpec.describe "outgoing_friends/index", type: :view do
  before(:each) do
    assign(:outgoing_friends, [
      OutgoingFriend.create!(),
      OutgoingFriend.create!()
    ])
  end

  it "renders a list of outgoing_friends" do
    render
    cell_selector = 'div>p'
  end
end
