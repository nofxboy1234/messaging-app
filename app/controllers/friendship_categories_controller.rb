class FriendshipCategoriesController < ApplicationController
  def index
    render inertia: "Friendship/Category", props: {}
  end
end
