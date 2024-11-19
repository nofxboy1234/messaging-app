require 'rails_helper'

RSpec.describe "outgoing_friends/show", type: :view do
  before(:each) do
    assign(:outgoing_friend, OutgoingFriend.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
