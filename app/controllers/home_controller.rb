class HomeController < ApplicationController
  def index
    puts "*** #{Current.user}"

    render inertia: "home/Index", props: {}
  end
end
