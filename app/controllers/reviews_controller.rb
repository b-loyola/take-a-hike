class ReviewsController < ApplicationController

  before_filter :restrict_access
  before_filter :load_hike

  def new
    @review = @hike.reviews.build
  end

  def create
    @review = @hike.reviews.build(review_params)
    @review.user_id = current_user.id

    if @review.save
      redirect_to @hike, notice: "Review created successfully"
    else
      render :new
    end
  end

  def destroy
    @review = Review.find(params[:id])
    if @review.destroy
      redirect_to :back, notice: "Review has been deleted"
    else
      redirect_to :back, notice: "Unable to delete Review"
    end
  end

  protected

  def review_params
    params.require(:review).permit(:rating, :comment)
  end

  def load_hike
    @hike = Hike.find(params[:hike_id])
  end

end
