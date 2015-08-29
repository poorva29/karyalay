class CreateKaryalayListsPandit < ActiveRecord::Migration
  def change
    create_table :karyalay_lists_pandits do |t|
      t.belongs_to :karyalay_pandit, index: true
      t.belongs_to :karyalay_list, index: true
    end
  end
end
