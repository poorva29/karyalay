class AddCityStateToKaryalayList < ActiveRecord::Migration
  def up
    add_column :karyalay_lists, :state, :string
    add_column :karyalay_lists, :city, :string
    add_column :karyalay_lists, :landmark, :string
  end
end
