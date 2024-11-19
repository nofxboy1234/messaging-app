require "rails_helper"

RSpec.describe IncomingFriendsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/incoming_friends").to route_to("incoming_friends#index")
    end

    it "routes to #new" do
      expect(get: "/incoming_friends/new").to route_to("incoming_friends#new")
    end

    it "routes to #show" do
      expect(get: "/incoming_friends/1").to route_to("incoming_friends#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/incoming_friends/1/edit").to route_to("incoming_friends#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/incoming_friends").to route_to("incoming_friends#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/incoming_friends/1").to route_to("incoming_friends#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/incoming_friends/1").to route_to("incoming_friends#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/incoming_friends/1").to route_to("incoming_friends#destroy", id: "1")
    end
  end
end
