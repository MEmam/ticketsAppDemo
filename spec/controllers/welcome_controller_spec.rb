require 'rails_helper'

RSpec.describe WelcomeController, type: :controller do

  describe "GET Home" do
    it "SUCCESS response" do
      get :home
      expect(response).to have_http_status(:success)
    end
  end

end
