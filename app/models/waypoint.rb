class Waypoint < ActiveRecord::Base

  belongs_to :hike

  validates :lat, presence: true

  validates :long, presence: true

end
