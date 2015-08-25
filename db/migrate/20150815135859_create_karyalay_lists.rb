class CreateKaryalayLists < ActiveRecord::Migration
  def change
    create_table :karyalay_lists do |t|
      t.text :name
      t.text :address
      t.text :description
      t.text :location
      t.integer :phone_number
      t.string :email
      t.timestamps
    end
  end
end
