class FaveHikesController < ApplicationController
  before_filter :restrict_access
  before_filter :load_hike

  def create
    @fave_hike = @hike.fave_hikes.new(user: current_user)
    respond_to do |format|
      if @fave_hike.save
        format.json { render json: @fave_hike, status: :created }
      else
        format.json { render :json => { :error => @fave_hike.errors.full_messages }, :status => 422 }
      end
    end
  end

  def destroy
    @fave_hike = FaveHike.find(params[:id])
    respond_to do |format|
      if @fave_hike.destroy
        format.json { render json: @fave_hike }
      else
        format.json { render :json => { :error => @fave_hike.errors.full_messages }, :status => 422 }
      end
    end
  end


  protected

  def load_hike
    @hike = Hike.find(params[:hike_id])
  end

end
