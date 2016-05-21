class FaveHikesController < ApplicationController
  before_filter :restrict_access
  before_filter :load_hike

  def create
    @fave_hike = @hike.fave_hikes.create(user: current_user)
    if @fave_hike.save
      redirect_to @hike, notice: "Succesfully Saved to Faves"
    else
      redirect_to @hike, notice: "Unable to Save to Faves"
    end
  end

  def destroy
    @fave_hike = FaveHike.find(params[:id])
    if @fave_hike.destroy
      redirect_to :back, notice: "Removed Hike from Faves"
    else
      redirect_to :back, notice: "Unable to remove hike from Faves"
    end
  end


  protected

  def load_hike
    @hike = Hike.find(params[:hike_id])
  end

end
