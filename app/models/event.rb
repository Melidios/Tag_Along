class Event < ApplicationRecord
  belongs_to :location
  belongs_to :user
  has_many :user_events
  has_many :participants, through: :user_events, source: :user
  has_one :activity_event
  has_one :activity, through: :activity_event
  has_many :messages

  before_create :convert_time_to_string

 scope :completed, -> { where(completed: true) }
 scope :pending,   -> { where(completed: false) }

 def convert_time_to_string
   self.start_time = self.start_time.to_i
 end
end
