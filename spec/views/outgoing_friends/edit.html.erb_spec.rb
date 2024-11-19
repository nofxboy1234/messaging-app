require 'rails_helper'

RSpec.describe "outgoing_friends/edit", type: :view do
  let(:outgoing_friend) {
    OutgoingFriend.create!()
  }

  before(:each) do
    assign(:outgoing_friend, outgoing_friend)
  end

  it "renders the edit outgoing_friend form" do
    render

    assert_select "form[action=?][method=?]", outgoing_friend_path(outgoing_friend), "post" do
    end
  end
end
