class KaryalaySamagri < ActiveRecord::Base
  has_and_belongs_to_many :karyalay_lists
  has_and_belongs_to_many :karyalay_packages
end
