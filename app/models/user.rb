class User < ApplicationRecord
  belongs_to :prefecture
  has_one :card
  has_many :items
  has_many :orders
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :password, presence: true, length: { minimum: 7 }
  validates :email, presence: true, uniqueness: true
  validates :nickname, presence: true
  validates :last_name, presence: true
  validates :first_name , presence: true
  validates :last_name_kana , presence: true
  validates :first_name_kana , presence: true
  validates :tel , presence: true
  validates :zip_code , presence: true
  validates :address , presence: true
  validates :birth_year , presence: true
  validates :birth_month , presence: true
  validates :birth_day , presence: true
end
