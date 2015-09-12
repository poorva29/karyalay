class CreateJoinTableKaryalayPackageKaryalayCaterer < ActiveRecord::Migration
  create_table :karyalay_caterers_packages do |t|
    t.references :karyalay_package, index: true
    t.references :karyalay_caterer, index: true
  end
end
