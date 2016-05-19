class CompletedHikesController < ApplicationController
  before_filter :restrict_access
  before_filter :load_hike

  def create
    @completed_hike = @hike.completed_hikes.create(user: current_user)
    if @completed_hike.save
      redirect_to @hike, notice: "Succesfully Marked as Complete!"
    else
      render :new
    end
  end

  protected

  def load_hike
    @hike = Hike.find(params[:hike_id])
  end

end
