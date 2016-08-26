require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "User Controller" do
    before(:all) do

      email = Faker::Internet.email
      password = Faker::Internet.password(8)
      @admin = Admin.create!(email: Faker::Internet.email, password: password, password_confirmation: password)

      password = Faker::Internet.password(8)
      @customer = Customer.create!(email: Faker::Internet.email, password: password, password_confirmation: password)

      @admin_auth = @admin.create_new_auth_token
      @customer_auth = @customer.create_new_auth_token
    end

    describe "GET #index" do
      it "returns http success" do
        get :index, @admin_auth.merge({ format: :json })
        expect(response).to have_http_status(:success)
      end
    end

    describe "GET #index" do
      it "returns same numbers users" do
        get :index, @customer_auth.merge({ format: :json })
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
