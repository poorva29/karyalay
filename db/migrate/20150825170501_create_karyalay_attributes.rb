class CreateKaryalayAttributes < ActiveRecord::Migration
  # belongs_to :karyalay_lists
  def change
    create_table :karyalay_attributes do |t|
      t.integer :no_of_people
      t.integer :no_of_rooms
      t.integer :price_half_day
      t.integer :price_full_day
      t.integer :size_in_sq
      t.integer :no_of_floors
      t.boolean :has_floors
      t.boolean :has_garden
      t.boolean :provide_offers
      t.boolean :has_ac
      t.boolean :has_caterer
      t.boolean :has_pandit
      t.boolean :has_samagri
      t.timestamps
    end
  end
end
