class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :street
      t.string :city
      t.string :state
      t.string :country
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
