class Hike < ActiveRecord::Base
	validates :name, presence: true
	validates :distance_in_km, numericality: {allow_blank: true, only_integer: true}
	validates :time_in_hours, numericality: {allow_blank: true, only_integer: true}
	validates :difficulty, numericality: {allow_blank: true, only_integer: true}

	serialize :waypoints, Array
	
end
