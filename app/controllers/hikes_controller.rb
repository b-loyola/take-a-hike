class HikesController < ApplicationController

  def index
    @hikes = Hike.select(:id,
      :spring, 
      :winter, 
      :summer, 
      :fall, 
      :name, 
      :distance_in_km, 
      :time_in_hours,
      :difficulty,
      :description,
      :start_lat,
      :start_lng ) 
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

  def nearby

    bounds = {
      max_lat: params[:position]["max_lat"].to_f,
      min_lat: params[:position]["min_lat"].to_f,
      max_lng: params[:position]["max_lng"].to_f,
      min_lng: params[:position]["min_lng"].to_f
    }

    puts bounds

    @hike = Hike.where('start_lat >= ? AND start_lat <= ?', bounds[:min_lat], bounds[:max_lat]).where('start_lng >= ? AND start_lng <= ?', bounds[:min_lng], bounds[:max_lng]).select(:id,
      :spring, 
      :winter, 
      :summer, 
      :fall, 
      :name, 
      :distance_in_km, 
      :time_in_hours,
      :difficulty,
      :start_lat,
      :start_lng 
    )

    respond_to do |format|
      format.json { render json: @hike }
    end
  end

  def show
  	@hike = Hike.find(params[:id])
    @hike_waypoints = @hike.simplified_waypoints(@hike.waypoints).to_json.html_safe
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

  def add_hike
    if current_user
      @hike = Hike.find(params[:id])
      current_user.hikes << @hike
    end
  end

	protected

  def hike_params
    params.require(:hike).permit(
      :name, :distance_in_km, :time_in_hours, :difficulty, :description
    )
  end
end
