require 'rails_helper'

RSpec.describe "messages/index", type: :view do
  before(:each) do
    assign(:messages, [
      Message.create!(
        body: "Body",
        user: nil
      ),
      Message.create!(
        body: "Body",
        user: nil
      )
    ])
  end

  it "renders a list of messages" do
    render
    cell_selector = 'div>p'
    assert_select cell_selector, text: Regexp.new("Body".to_s), count: 2
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
  end
end
