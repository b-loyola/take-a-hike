class CreateSavedHikes < ActiveRecord::Migration
  def change
    create_table :saved_hikes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :hike, index: true, foreign_key: true
      t.integer :times_completed, default: 0
      t.boolean :favourite, default: false

      t.timestamps null: false
    end
  end
end
