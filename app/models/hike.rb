class Hike < ActiveRecord::Base

  has_many :reviews, dependent: :destroy
  has_many :users, through: :saved_hikes
  has_many :saved_hikes, dependent: :destroy

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

  # paginates_per 30

  def difficulty_description
    case self.difficulty
    when 0
      "Easy as Pie"
    when 1
      "A Walk in the Park"
    when 2
      "Between a Rock and a Hard Place"
    when 3
      "Grueling"
    end
  end

  def simplified_waypoints(array)
    simplified = []
    array.each_with_index do |point,i|
      simplified << point if i % 2 == 0
    end
    simplified
  end

  def average_rating
    reviews.count > 0 ? (reviews.sum(:rating).to_f/reviews.count).round(2) : 0
  end

end
