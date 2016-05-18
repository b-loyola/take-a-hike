class FaveHike < ActiveRecord::Base
  belongs_to :hike
  belongs_to :user

  validates :hike_id, uniqueness: {scope: :user_id, message: "user can only favourite a hike once"}
end
