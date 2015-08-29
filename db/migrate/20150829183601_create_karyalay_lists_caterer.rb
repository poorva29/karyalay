class CreateKaryalayListsCaterer < ActiveRecord::Migration
  def up
    create_table :karyalay_caterers_lists do |t|
      t.belongs_to :karyalay_caterer, index: true
      t.belongs_to :karyalay_list, index: true
    end
  end
end
