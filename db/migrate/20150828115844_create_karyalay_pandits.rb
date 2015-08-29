class CreateKaryalayPandits < ActiveRecord::Migration
  def up
    create_table :karyalay_pandits do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_numner
      t.string :email
      t.timestamps
    end
  end
end
