class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :gender
      t.string :email
      t.string :phone_number
      t.boolean :notification, default: false

      t.timestamps
    end
  end
end
