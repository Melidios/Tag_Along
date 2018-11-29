class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.date :event_date, null: false
      t.string :start_time, null: false
      t.time :end_time
      t.integer :quantity
      t.integer :notification
      t.boolean :completed, default: false
      t.references :location, foreign_key: true
      t.references :user, foreign_key: true, index: true
      t.timestamps
    end
  end
end
