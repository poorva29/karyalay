class CreateJoinTableKaryalayPackageKaryalayPanfit < ActiveRecord::Migration
  def change
    create_table :karyalay_packages_pandits do |t|
      t.references :karyalay_package, index: true
      t.references :karyalay_pandit, index: true
    end
  end
end
