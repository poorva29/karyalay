class CreateKaryalayCaterers < ActiveRecord::Migration
  def change
    create_table :karyalay_caterers do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_numner
      t.text :specialites, array: true, default: []
      t.timestamps
    end
  end
end
