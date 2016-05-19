class CompletedHikesController < ApplicationController
  before_filter :restrict_access
  before_filter :load_hike

  def create
    @completed_hike = @hike.completed_hikes.create(user: current_user)
    if @completed_hike.save
      redirect_to @hike, notice: "Succesfully Marked as Complete!"
    else
      redirect_to @hike, notice: "Unable to Mark as Complete"
    end
  end

  def destroy
    @completed_hike = CompletedHike.find(params[:id])
    if @completed_hike.destroy
      redirect_to :back, notice: "Removed Completed Hike Entry"
    else
      redirect_to :back, notice: "Unable to remove Completed Hike"
    end
  end

  protected

  def load_hike
    @hike = Hike.find(params[:hike_id])
  end

end
