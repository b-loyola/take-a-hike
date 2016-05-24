class SessionsController < ApplicationController

  def return_point
    session[:return_point] || root_path
  end

  def new
    session[:return_point] = request.referer
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to return_point, notice: "Welcome back, #{user.first_name}!"
    else
      flash.now[:alert] = "Log in failed..."
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Peace out, Happy Hiking!"
  end

end
