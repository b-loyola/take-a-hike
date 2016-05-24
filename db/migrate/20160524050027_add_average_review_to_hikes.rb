class AddAverageReviewToHikes < ActiveRecord::Migration
  def change
    add_column :hikes, :average_rating, :integer
  end
end
