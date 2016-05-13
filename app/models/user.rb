class User < ActiveRecord::Base

  has_many :reviews, dependent: :destroy

  has_secure_password

  validates :first_name, presence: true

  validates :last_name, presence: true

  validates :email, presence: true, uniqueness: true

  validates :password,
    length: { in: 5..20 }, on: :create

  def full_name
    "#{first_name} #{last_name}"
  end

end
