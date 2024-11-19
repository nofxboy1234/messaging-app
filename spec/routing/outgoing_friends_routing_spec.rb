require "rails_helper"

RSpec.describe OutgoingFriendsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/outgoing_friends").to route_to("outgoing_friends#index")
    end

    it "routes to #new" do
      expect(get: "/outgoing_friends/new").to route_to("outgoing_friends#new")
    end

    it "routes to #show" do
      expect(get: "/outgoing_friends/1").to route_to("outgoing_friends#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/outgoing_friends/1/edit").to route_to("outgoing_friends#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/outgoing_friends").to route_to("outgoing_friends#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/outgoing_friends/1").to route_to("outgoing_friends#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/outgoing_friends/1").to route_to("outgoing_friends#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/outgoing_friends/1").to route_to("outgoing_friends#destroy", id: "1")
    end
  end
end
