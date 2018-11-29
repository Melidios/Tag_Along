class CreateActivityLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :activity_locations do |t|
      t.references :activity, foreign_key: true
      t.references :location, foreign_key: true

      t.timestamps
    end
  end
end
