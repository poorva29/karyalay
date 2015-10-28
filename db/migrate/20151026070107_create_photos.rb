class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.belongs_to :karyalay_list, index: true
      t.timestamps
    end
  end
end
