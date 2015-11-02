class KaryalayPackagesSamagri < ActiveRecord::Base
  belongs_to :karyalay_samagri
  belongs_to :karyalay_package
  validates_presence_of :quantity
end
