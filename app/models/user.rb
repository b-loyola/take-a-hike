class User < ActiveRecord::Base

  has_many :reviews, dependent: :destroy

  has_secure_password

  validates :name, presence: true

  validates :email, presence: true, uniqueness: true

  validates :password,
    length: { in: 5..20 }, on: :create

end
