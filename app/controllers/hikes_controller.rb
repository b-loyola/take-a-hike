class HikesController < ApplicationController

  def index
    @hikes = Hike.all.page(params[:page])
    @hikes = @hikes.spring if params[:spring]
    @hikes = @hikes.winter if params[:winter]
    @hikes = @hikes.summer if params[:summer]
    @hikes = @hikes.fall if params[:fall]
    @hikes = @hikes.difficulty(params[:difficulty]) if params[:difficulty] && params[:difficulty] != ''
    if params[:duration]
      min,max = params[:duration].split('-')
      @hikes = @hikes.duration(min,max)
    end
    @hikes = @hikes.search_name(params[:search_name]) if params[:search_name]
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
