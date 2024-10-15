class HomeController < ApplicationController
  def index
    render inertia: "home/Index", props: {}
  end
end
