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
    @todo_hikes = SavedHike.where(user_id: params[:id], times_completed: 0)
    @completed_hikes = SavedHike.where(user_id: params[:id]).where('times_completed >= 1')
    @fave_hikes = SavedHike.where(user_id: params[:id], favourite: true)
  end

  protected

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
  end

end
