class CreateCompletedHikes < ActiveRecord::Migration
  def change
    create_table :completed_hikes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :hike, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
