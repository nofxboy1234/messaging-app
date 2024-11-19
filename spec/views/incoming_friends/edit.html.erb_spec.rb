require 'rails_helper'

RSpec.describe "incoming_friends/edit", type: :view do
  let(:incoming_friend) {
    IncomingFriend.create!()
  }

  before(:each) do
    assign(:incoming_friend, incoming_friend)
  end

  it "renders the edit incoming_friend form" do
    render

    assert_select "form[action=?][method=?]", incoming_friend_path(incoming_friend), "post" do
    end
  end
end
