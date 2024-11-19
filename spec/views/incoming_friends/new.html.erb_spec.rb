require 'rails_helper'

RSpec.describe "incoming_friends/new", type: :view do
  before(:each) do
    assign(:incoming_friend, IncomingFriend.new())
  end

  it "renders new incoming_friend form" do
    render

    assert_select "form[action=?][method=?]", incoming_friends_path, "post" do
    end
  end
end
