class CreateKaryalayPackageSamagri < ActiveRecord::Migration
  def change
    create_table :karyalay_packages_samagris do |t|
      t.belongs_to :karyalay_package, index: true
      t.belongs_to :karyalay_samagri, index: true
      t.integer :quantity
    end
  end
end
