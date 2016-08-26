require 'rails_helper'
require 'devise'

RSpec.describe RequestsController, type: :controller do
  describe "Test Request Endpoint" do
    before(:all) do
      RequestStatus.create!(name: 'recent')
      RequestStatus.create!(name: 'closed')

      email = Faker::Internet.email
      password = Faker::Internet.password(8)
      @admin = Admin.create!(email: Faker::Internet.email, password: password, password_confirmation: password)

      password = Faker::Internet.password(8)
      @customer = Customer.create!(email: Faker::Internet.email, password: password, password_confirmation: password)

      password = Faker::Internet.password(8)
      @customer2 = Customer.create!(email: Faker::Internet.email, password: password, password_confirmation: password)

      password = Faker::Internet.password(8)
      @support_agent = SupportAgent.create!(email: Faker::Internet.email, password: password, password_confirmation: password)

      @admin_auth = @admin.create_new_auth_token
      @customer_auth = @customer.create_new_auth_token
      @support_agent_auth = @support_agent.create_new_auth_token
    end

    it "Empty Requests" do
      get :index, @admin_auth.merge({ format: :json})
      expect(response).to have_http_status(:ok)
      get :index, @customer_auth.merge({ format: :json})
      expect(response).to have_http_status(:ok)
      get :index, @support_agent_auth.merge({ format: :json})
      expect(response).to have_http_status(:ok)
    end

    it "PDF Requests" do
      get :index, @admin_auth.merge({ format: :pdf})
      expect(response).to have_http_status(:ok)
      expect(response.headers["Content-Type"]).to eq("application/pdf")
      get :index, @customer_auth.merge({ format: :pdf})
      expect(response).to have_http_status(:ok)
      expect(response.headers["Content-Type"]).to eq("application/pdf")
      get :index, @support_agent_auth.merge({ format: :pdf})
      expect(response).to have_http_status(:ok)
      expect(response.headers["Content-Type"]).to eq("application/pdf")
    end

    it "Create Request" do
      label = Faker::Lorem.word
      name = Faker::Lorem.word
      expect {
        post :create, @customer_auth.merge({
          request:{
            label: label,
            name: name
          },
          format: :json
        })
      }.to change {
        Request.count
      }.by(1)
    end

    it "GET index - One Request" do
      label = Faker::Lorem.word
      name = Faker::Lorem.word
      request = Request.create!(name: name, label: label, customer_id: @customer.id, request_status_id: RequestStatus.recent.first.id)
      get :index, @admin_auth.merge({ format: :json })
      expect(assigns(:requests).to_a).to eq([request])

      get :index, @customer_auth.merge({ format: :json })
      expect(assigns(:requests).to_a).to eq([request])

      get :index, @support_agent_auth.merge({ format: :json })
      expect(assigns(:requests).to_a).to eq([request])
    end

    it "GET index - customer see his only" do
      label = Faker::Lorem.word
      name = Faker::Lorem.word
      request = Request.create!(name: name, label: label, customer_id: @customer.id, request_status_id: RequestStatus.recent.first.id)
      request2 = Request.create!(name: name, label: label, customer_id: @customer2.id, request_status_id: RequestStatus.recent.first.id)

      get :index, @customer_auth.merge({ format: :json })
      expect(assigns(:requests).to_a).to eq([request])
      expect(assigns(:requests).to_a).not_to eq([request2])
    end

    it "PUT request" do
      label = Faker::Lorem.word
      name = Faker::Lorem.word
      request = Request.create!(name: name, label: label, customer_id: @customer.id, request_status_id: RequestStatus.recent.first.id)
      label2 = Faker::Lorem.word
      name2 = Faker::Lorem.word
      put :update, @admin_auth.merge({
        id: request.id,
        request:{
          label: label2,
          name: name2
        },
        format: :json
      })
      request.reload
      expect(request.name).to eq(name2)
      expect(request.label).to eq(label2)
    end

    it "Delete request" do
      label = Faker::Lorem.word
      name = Faker::Lorem.word
      request = Request.create!(name: name, label: label, customer_id: @customer.id, request_status_id: RequestStatus.recent.first.id)
      expect {
        delete :destroy, @admin_auth.merge({
          id: request.id,
          format: :json
        })
      }.to change {
        Request.count
      }.by(-1)
    end

    it "GET Request status Request" do
      get :statuses, @admin_auth.merge({ format: :json })
      expect(assigns(:request_statuses)).to eq(RequestStatus.all)
    end
  end
end
