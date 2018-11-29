class User < ApplicationRecord
  has_one  :profile
  has_many :events
  has_many :user_activities
  has_many :activities, through: :user_activities
  has_many :user_events
  has_many :events, through: :user_events
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
