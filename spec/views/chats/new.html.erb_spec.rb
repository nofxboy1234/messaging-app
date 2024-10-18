require 'rails_helper'

RSpec.describe "chats/new", type: :view do
  before(:each) do
    assign(:chat, Chat.new(
      name: "MyString"
    ))
  end

  it "renders new chat form" do
    render

    assert_select "form[action=?][method=?]", chats_path, "post" do

      assert_select "input[name=?]", "chat[name]"
    end
  end
end
