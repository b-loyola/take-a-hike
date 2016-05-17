class SavedHike < ActiveRecord::Base
  belongs_to :user
  belongs_to :hike

  validates :hike_id, uniqueness: {scope: :user_id, message: "should only be added once per user"}
end
