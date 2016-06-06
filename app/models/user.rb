class User < ActiveRecord::Base

  has_secure_password
  has_many :reviews, dependent: :destroy
  has_many :hikes, through: :fave_hikes
  has_many :hikes, through: :completed_hikes
  has_many :fave_hikes, dependent: :destroy
  has_many :completed_hikes, dependent: :destroy

  has_many :pictures, as: :imageable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password,
    length: { in: 5..20 }, on: :create

  def full_name
    "#{first_name} #{last_name}"
  end

  def kms_hiked
    self.completed_hikes.joins(:hike).references(:hike).sum('hikes.distance_in_km')
  end

  def hiker_level
    dist = self.kms_hiked
    if dist == 0
      "Nature Neophyte"
    elsif dist >= 1 && dist < 20
      "Wayward Wanderer"
    elsif dist >= 20 && dist < 50
      "Tenacious Trekker"
    elsif dist >= 50 && dist < 100
      "Expert Explorer"
    elsif dist >= 100
      "Master Mountaineer"
    end
  end

  def has_not_rated?(hike)
    self.reviews.pluck(:hike_id).exclude?(hike.id)
  end

  def number_of_times_completed(hike)
    self.completed_hikes.pluck(:hike_id).count(hike.id)
  end

  def has_favourited?(hike)
    self.fave_hikes.pluck(:hike_id).include?(hike.id)
  end

end
