class Hike < ActiveRecord::Base
	validates :name, presence: true
	validates :distance_in_km, numericality: {allow_blank: true, only_integer: true}
	validates :time_in_hours, numericality: {allow_blank: true, only_integer: true}
	validates :difficulty, numericality: {allow_blank: true, only_integer: true}

	serialize :waypoints, Array

  scope :winter, -> { where(winter: true) }
  scope :spring, -> { where(spring: true) }
  scope :summer, -> { where(summer: true) }
  scope :fall, -> { where(fall: true) }
  scope :duration, -> (min, max) { where('time_in_hours >= ? AND time_in_hours <= ?', min, max)}
  scope :difficulty, -> (index) { where('difficulty = ?', index) }
  scope :search_name, -> (search) { where("name iLIKE ?", "%#{search}%") }

  # paginates_per 20

end
