class AddHasRoomsToKaryalayAttribute < ActiveRecord::Migration
  def up
    add_column :karyalay_attributes, :has_rooms, :boolean
  end

  def down
    remove_column :karyalay_attributes, :has_rooms
  end
end
