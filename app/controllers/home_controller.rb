class HomeController < ApplicationController
  def index
    puts "*** home controller"
    render inertia: "home/Index", props: {}
  end
end
