class HomeController < ApplicationController
  def index
    render inertia: "home/Index", props: { session: Current.session }
  end
end
