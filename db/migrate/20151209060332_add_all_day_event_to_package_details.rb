class AddAllDayEventToPackageDetails < ActiveRecord::Migration
  def up
    add_column :karyalay_packages, :all_day, :boolean, default: false
  end

  def down
    remove_column :karyalay_packages, :all_day
  end
end
