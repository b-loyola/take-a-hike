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
      "Easy"
    when 1
      "Medium"
    when 2
      "Hard"
    when 3
      "Extreme"
    end
  end

  def simplified_waypoints(array)
    simplified = []
    array.each_with_index do |point,i|
      simplified << point if i % 2 == 0
    end
    if simplified.length > 300
      return simplified_waypoints(simplified)
    else
      simplified
    end
  end

  def average_rating
    reviews.count > 0 ? (reviews.sum(:rating).to_f/reviews.count).round(0) : 0
  end

  def seasons
    seasons = []
    seasons << "Winter" if winter
    seasons << "Spring" if spring
    seasons << "Summer" if summer
    seasons << "Fall" if fall
    seasons
  end

end
