require 'rails_helper'

RSpec.describe "profiles/index", type: :view do
  before(:each) do
    assign(:profiles, [
      Profile.create!(
        username: "Username",
        picture: "Picture",
        about: "MyText",
        user: nil
      ),
      Profile.create!(
        username: "Username",
        picture: "Picture",
        about: "MyText",
        user: nil
      )
    ])
  end

  it "renders a list of profiles" do
    render
    cell_selector = 'div>p'
    assert_select cell_selector, text: Regexp.new("Username".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Picture".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("MyText".to_s), count: 2
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
  end
end
