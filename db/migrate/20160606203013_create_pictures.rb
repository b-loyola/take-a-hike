class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :image
      t.string :description
      t.integer :hike_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
