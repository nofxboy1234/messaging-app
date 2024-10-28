require 'rails_helper'

RSpec.describe "PendingFriendships", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/pending_friendships/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/pending_friendships/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/pending_friendships/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
