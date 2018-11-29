class AddActivityIdToProfile < ActiveRecord::Migration[5.2]
  def change
   add_column :profiles, :activity_id, :integer, array: true, default: []
 end
end
