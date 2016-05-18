class CreateFaveHikes < ActiveRecord::Migration
  def change
    create_table :fave_hikes do |t|
      t.references :hike, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
