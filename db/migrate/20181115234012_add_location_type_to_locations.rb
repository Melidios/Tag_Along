class AddLocationTypeToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :location_type, :string
  end
end
