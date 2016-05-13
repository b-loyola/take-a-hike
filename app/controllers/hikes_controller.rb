class HikesController < ApplicationController

  def index
  	@hikes = Hike.all
  end

  def show
  	@hike = Hike.find(params[:id])
  end

  def edit
  	@hike = Hike.find(params[:id])
  end

  def create
  	@hike = Hike.new(hike_params)

		if @hike.save
		  redirect_to hikes_path
		else
		  render :new
		end
  end

	def destroy
	  @hike = Hike.find(params[:id])
	  @hike.destroy
	  redirect_to hikes_path
	end

	protected

  def hike_params
    params.require(:hike).permit(
      :name, :distance_in_km, :time_in_hours, :difficulty, :description
    )
  end
end
