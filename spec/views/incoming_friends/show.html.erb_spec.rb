require 'rails_helper'

RSpec.describe "incoming_friends/show", type: :view do
  before(:each) do
    assign(:incoming_friend, IncomingFriend.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
