class ChangePhoneNumberInKaryalayList < ActiveRecord::Migration
  def up
    change_column :karyalay_lists, :phone_number, :text
  end

  def down
    change_column :my_table, :phone_number, :integer
  end
end
