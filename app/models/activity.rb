class Activity < ApplicationRecord
  has_many :user_activities, dependent: :destroy
  has_many :users, through: :user_activities
  has_many :activity_locations, dependent: :destroy
  has_many :locations, through: :activity_locations
  has_one  :activity_event, dependent: :destroy
  has_many :events, through: :activity_event

  scope :loc_basketball, -> { find_by(name: "Basketball").locations }
  scope :loc_biking, -> { find_by(name: "Biking").locations }
  scope :loc_golf, -> { find_by(name: "Tennis").locations }
  scope :loc_baseball, -> { find_by(name: "Baseball").locations }
  scope :loc_tennis, -> { find_by(name: "Tennis").locations }
  scope :loc_volleyball, -> { find_by(name: "Volleyball").locations }

end
