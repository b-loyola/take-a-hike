class CreateWaypoints < ActiveRecord::Migration
  def change
    create_table :waypoints do |t|
      t.float :lat
      t.float :lon
      t.integer :index

      t.timestamps null: false
    end
  end
end
