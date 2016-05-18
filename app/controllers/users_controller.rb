class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to hikes_path, notice: "Welcome back to the trails, #{@user.first_name}!"
    else
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    @completed_hikes = @user.completed_hikes
    @fave_hikes = @user.fave_hikes
  end

  protected

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
  end

end
