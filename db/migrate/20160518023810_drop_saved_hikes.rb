class DropSavedHikes < ActiveRecord::Migration
  def change
    drop_table :saved_hikes
  end
end
