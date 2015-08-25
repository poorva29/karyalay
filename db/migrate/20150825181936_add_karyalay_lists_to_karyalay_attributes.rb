class AddKaryalayListsToKaryalayAttributes < ActiveRecord::Migration
  def change
    add_reference :karyalay_attributes, :karyalay_list, index: true
  end
end
