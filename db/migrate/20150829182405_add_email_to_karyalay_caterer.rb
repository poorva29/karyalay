class AddEmailToKaryalayCaterer < ActiveRecord::Migration
  def up
    add_column :karyalay_caterers, :email, :string
  end

  def down
    add_column :karyalay_caterers, :email
  end
end
