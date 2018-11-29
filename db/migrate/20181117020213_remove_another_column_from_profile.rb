class RemoveAnotherColumnFromProfile < ActiveRecord::Migration[5.2]
  def change
    remove_column :profiles, :phone_number, :string
  end
end
