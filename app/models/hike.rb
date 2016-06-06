class Hike < ActiveRecord::Base

  has_many :reviews, dependent: :destroy
  has_many :users, through: :fave_hikes
  has_many :users, through: :completed_hikes
  has_many :fave_hikes, dependent: :destroy
  has_many :completed_hikes, dependent: :destroy

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

  def distance_description
    self.distance_in_km == 0 ? "Under a km" : "#{ self.distance_in_km } km"
  end

  def simplified_waypoints(waypoints)
    return waypoints if waypoints.length < 600
    simplified_waypoints( waypoints.each_slice(2).map(&:first) )
  end

  def average_rating
    reviews.average(:rating) || 0
  end

  def seasons
    seasons = []
    seasons << "Winter" if winter
    seasons << "Spring" if spring
    seasons << "Summer" if summer
    seasons << "Fall" if fall
    seasons
  end

  def self.top_rated
    top_rated = Review.
      select("AVG(reviews.rating) as average_rating, reviews.hike_id").
      group(:hike_id).
      order("average_rating DESC").
      limit(1)
    top_rated.first.try!(:hike) || Hike.all.sample
  end

  def self.featured
    Hike.all.sample
  end

end
