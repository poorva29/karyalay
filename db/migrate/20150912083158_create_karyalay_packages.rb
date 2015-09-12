class CreateKaryalayPackages < ActiveRecord::Migration
  def change
    create_table :karyalay_packages do |t|
      t.string :subject
      t.date :from_date
      t.time :from_time
      t.time :to_time
      t.boolean :has_ac
      t.boolean :has_garden
      t.integer :num_rooms
      t.string :ref_name
      t.string :ref_phone_number
      t.belongs_to :karyalay_list, index: true
      t.timestamps
    end
  end
end
