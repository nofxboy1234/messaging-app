require 'rails_helper'

RSpec.describe "profiles/show", type: :view do
  before(:each) do
    assign(:profile, Profile.create!(
      username: "Username",
      picture: "Picture",
      about: "MyText",
      user: nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Username/)
    expect(rendered).to match(/Picture/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(//)
  end
end
