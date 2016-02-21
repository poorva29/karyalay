class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  skip_before_filter :authenticate_user!, only: [:user_role_name]

  respond_to :html

  def user_role_name
    user_role = current_user ? current_user.role.name : 'Visitor'
    render json: { user_role: user_role }
  end

  def index
    @users = User.all
    respond_with(@users)
  end

  def show
    respond_with(@user)
  end

  def new
    @user = User.new
    respond_with(@user)
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    @user.save
    respond_with(@user)
  end

  def update
    @user.update(user_params)
    respond_with(@user)
  end

  def destroy
    @user.destroy
    respond_with(@user)
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params[:user]
    end
end
