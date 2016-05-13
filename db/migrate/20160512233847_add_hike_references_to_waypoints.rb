class AddHikeReferencesToWaypoints < ActiveRecord::Migration
  def change
    add_reference :waypoints, :hike, index: true, foreign_key: true
  end
end
