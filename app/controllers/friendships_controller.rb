class FriendshipsController < ApplicationController
  def index
    @friends = Current.user.friends
    render inertia: "Friendships/Index", props: {
      friends: @friends.map do |friend|
        serialize_friend(friend)
      end
    }
  end

  def create
    puts "friendships#create"
    # render inertia: "Friendships/Create"
  end

  def update
    render inertia: "Friendships/Update"
  end

  def destroy
    render inertia: "Friendships/Destroy"
  end

  private

  def serialize_friend(friend)
    friend.as_json(include: :profile)
  end
end
