require 'rails_helper'

RSpec.describe "friends/show", type: :view do
  before(:each) do
    assign(:friend, Friend.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
