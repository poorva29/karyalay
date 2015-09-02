class CreateKaryalayListsSamagri < ActiveRecord::Migration
  def change
    create_table :karyalay_lists_samagris do |t|
      t.belongs_to :karyalay_samagri, index: true
      t.belongs_to :karyalay_list, index: true
      t.integer :quantity
    end
  end
end
