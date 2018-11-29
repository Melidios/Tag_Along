class Location < ApplicationRecord
   validates :name, presence: true
   geocoded_by :address
   after_validation :geocode
   has_many :activity_locations
   has_many :activity, through: :activity_locations
   has_many :events

   def address
    [street, city, state, country].compact.join(',')
  end

end
