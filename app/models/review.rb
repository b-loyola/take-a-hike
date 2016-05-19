class Review < ActiveRecord::Base

  belongs_to :user
  belongs_to :hike

  validates :user, presence: true

  validates :hike, presence: true

  validates :user, uniqueness: {scope: :hike, message: 'can only review each hike once.'} 

  validates :rating, numericality: {  only_integer: true, 
                                      greater_than_or_equal_to: 1, 
                                      less_than_or_equal_to: 5 }

end
