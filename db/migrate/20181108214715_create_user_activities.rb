class CreateUserActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :user_activities do |t|
      t.references :user, foreign_key: true
      t.references :activity, foreign_key: true
      t.integer :skill

      t.timestamps
    end
  end
end
