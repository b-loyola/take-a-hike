class FaveHikesController < ApplicationController
  before_filter :restrict_access
  before_filter :load_hike

  def create
    @fave_hike = @hike.fave_hikes.create(user: current_user)
    if @fave_hike.save
      redirect_to @hike, notice: "Succesfully Saved to Faves"
    else
      render :new
    end
  end

  protected

  def load_hike
    @hike = Hike.find(params[:hike_id])
  end

end
