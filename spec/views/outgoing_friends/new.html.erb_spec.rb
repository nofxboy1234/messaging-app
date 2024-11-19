require 'rails_helper'

RSpec.describe "outgoing_friends/new", type: :view do
  before(:each) do
    assign(:outgoing_friend, OutgoingFriend.new())
  end

  it "renders new outgoing_friend form" do
    render

    assert_select "form[action=?][method=?]", outgoing_friends_path, "post" do
    end
  end
end
