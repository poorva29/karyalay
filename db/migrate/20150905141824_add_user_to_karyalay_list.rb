class AddUserToKaryalayList < ActiveRecord::Migration
  def change
    add_reference :karyalay_lists, :user, index: true
  end
end
