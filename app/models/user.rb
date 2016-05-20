class User < ActiveRecord::Base

  has_secure_password
  has_many :reviews, dependent: :destroy
  has_many :hikes, through: :fave_hikes
  has_many :hikes, through: :completed_hikes
  has_many :fave_hikes, dependent: :destroy
  has_many :completed_hikes, dependent: :destroy

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
    # Option 1 - longest and least efficient
    # kms = 0
    # self.saved_hikes.where('times_completed >= ?', 1).each do |saved_hike|
    #   kms += (saved_hike.hike.distance_in_km * saved_hike.times_completed)
    # end
    # return kms

    # Option 2 - same as #1 but better Ruby style
    # kms = self.saved_hikes.where('times_completed >= ?', 1).inject(0) { |sum, s| sum += (s.hike.distance_in_km * s.times_completed) }

    # Option 3 - More efficient way (by using database more instead of Ruby)
    # self.saved_hikes.joins(:hike).references(:hike).sum('hikes.distance_in_km * saved_hikes.times_completed')
    
    # Option 4 - Most efficient by only using database - Note: there appears to be an error when running
    # SELECT SUM(hikes.distance_in_km * saved_hikes.times_completed) FROM "saved_hikes" INNER JOIN "hikes" ON "hikes"."id" = "saved_hikes"."hike_id" WHERE "saved_hikes"."user_id" = 1 AND (times_completed >= 1)
  end

  def hiker_level

    # level = { 1 => "Nature Neophyte",
    #           2 => "Wayward Wanderer",
    #           3 => "Tenacious Trekker",
    #           4 => "Expert Explorer",
    #           5 => "Master Mountaineer" }
    # distance_range_1 = 0
    # distance_range_2 = (1..14)
    # distance_range_3 = (15..39)
    # distance_range_4 = (40..99)
    # distance_range_5 = (100..100000)

    dist = self.kms_hiked
    if dist == 0
      "Nature Neophyte"
    elsif dist >= 1
      "Wayward Wanderer"
    elsif dist >= 15
      "Tenacious Trekker"
    elsif dist >= 40
      "Expert Explorer"
    elsif dist >= 100
      "Master Mountaineer"
    end
  end

  def 

  def kms_to_next_level
    current_level = hiker_level

  end

end
