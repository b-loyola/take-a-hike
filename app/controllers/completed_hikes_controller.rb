class CompletedHikesController < ApplicationController
  before_filter :restrict_access
  before_filter :load_hike

  def create
    @completed_hike = @hike.completed_hikes.new(user: current_user)
    respond_to do |format|
      if @completed_hike.save
        format.json { render json: @completed_hike, status: :created }
      else
        format.json { render :json => { :error => @completed_hike.errors.full_messages }, :status => 422 }
      end
    end
  end

  def destroy
    @completed_hike = CompletedHike.find(params[:id])
    respond_to do |format|
      if @completed_hike.destroy
        format.json { render json: @completed_hike }
      else
        format.json { render :json => { :error => @completed_hike.errors.full_messages }, :status => 422 }
      end
    end
  end

  protected

  def load_hike
    @hike = Hike.find(params[:hike_id])
  end

end
