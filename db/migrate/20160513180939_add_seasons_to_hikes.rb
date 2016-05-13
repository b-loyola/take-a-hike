class AddSeasonsToHikes < ActiveRecord::Migration
  def change
    add_column :hikes, :winter, :boolean
    add_column :hikes, :spring, :boolean
    add_column :hikes, :summer, :boolean
    add_column :hikes, :fall, :boolean
  end
end
