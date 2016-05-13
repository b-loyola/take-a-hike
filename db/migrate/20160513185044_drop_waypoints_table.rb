class DropWaypointsTable < ActiveRecord::Migration
  def change
    drop_table :waypoints
  end
end
