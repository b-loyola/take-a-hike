class AddWaypointsToHikes < ActiveRecord::Migration
  def change
    add_column :hikes, :waypoints, :text
    add_column :hikes, :start_lat, :float
    add_column :hikes, :start_lng, :float
  end
end
