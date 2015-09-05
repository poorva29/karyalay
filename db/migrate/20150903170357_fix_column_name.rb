class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :karyalay_pandits, :phone_numner, :phone_number
    rename_column :karyalay_caterers, :phone_numner, :phone_number
  end
end
