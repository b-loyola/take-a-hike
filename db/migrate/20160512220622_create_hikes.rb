class CreateHikes < ActiveRecord::Migration
  def change
    create_table :hikes do |t|
      t.string :name
      t.integer :distance_in_km
      t.integer :time_in_hours
      t.integer :difficulty
      t.text :description

      t.timestamps null: false
    end
  end
end
