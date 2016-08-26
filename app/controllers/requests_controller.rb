class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :update, :destroy]
  respond_to :json, :pdf

  def index
    @requests = permitted_request
    respond_to do |format|
      format.json
      format.pdf do
        @last_month = Date.today.last_month
        @requests = @requests.where(
          :created_at =>
            @last_month.beginning_of_month.beginning_of_day..@last_month.end_of_month.end_of_day
        )
        @requests = @requests.closed
        render pdf: "closed_request", layout: "application"
      end
    end
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def create
    @request = Request.new(request_params)
    @request.customer = current_user
    @request.request_status = RequestStatus.recent.first

    if @request.save
      render :show, status: :ok, location: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def update
    if (!current_user.is_a?(Customer) || @request.user_id == current_user.id) and @request.update(request_params)
      render :show, status: :ok, location: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @request.destroy
    render json: {head: :no_content}
  end

  def statuses
    @request_statuses = RequestStatus.all
    respond_to do |format|
      format.json
    end
  end

  private
    def set_request
      @request = Request.find(params[:id])
    end

    def request_params
      params.fetch(:request, {}).permit(:label, :name, :request_status_id)
    end

    def permitted_request
      if current_user.is_a?(Customer)
        current_user.requests
      else
        Request.all
      end
    end
end
