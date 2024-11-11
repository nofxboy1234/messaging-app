require 'rails_helper'

RSpec.describe "friends/index", type: :view do
  before(:each) do
    assign(:friends, [
      Friend.create!(),
      Friend.create!()
    ])
  end

  it "renders a list of friends" do
    render
    cell_selector = 'div>p'
  end
end
