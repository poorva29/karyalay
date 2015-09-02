class CreateKaryalaySamagris < ActiveRecord::Migration
  def change
    create_table :karyalay_samagris do |t|
      t.string :name
      t.string :category
      t.timestamps
    end
  end
end
