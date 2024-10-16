require 'rails_helper'

RSpec.describe "PersistedChats", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/persisted_chat/index"
      expect(response).to have_http_status(:success)
    end
  end

end
