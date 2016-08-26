class UsersController < ApplicationController
  before_action :check_admin
  before_action :set_user, only: [:update, :destroy]
  respond_to :json

  def index
    @users = User.all
    respond_to do |format|
      format.json {render json: @users}
    end
  end

  def update
    if current_user.is_a?(Admin) and @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def types
    @types = User.descendants.map(&:to_s)
    render json: @types
  end

  def destroy
    @user.destroy
    render json: {head: :no_content}
  end

  private
    def user_params
      params.fetch(:user, {}).permit(:type)
    end

    def set_user
      @user = User.find(params[:id])
    end

    def check_admin
      unless current_user.is_a?(Admin)
        redirect_to root_path, status: :unauthorized
      end
    end
end
