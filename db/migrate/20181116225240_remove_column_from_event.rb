class RemoveColumnFromEvent < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :end_time, :time
  end
end
