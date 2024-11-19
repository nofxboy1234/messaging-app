require 'rails_helper'

RSpec.describe "incoming_friends/index", type: :view do
  before(:each) do
    assign(:incoming_friends, [
      IncomingFriend.create!(),
      IncomingFriend.create!()
    ])
  end

  it "renders a list of incoming_friends" do
    render
    cell_selector = 'div>p'
  end
end
