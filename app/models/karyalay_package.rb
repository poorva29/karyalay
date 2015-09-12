class KaryalayPackage < ActiveRecord::Base
  belongs_to :karyalay_list
  has_and_belongs_to_many :karyalay_pandit
  has_and_belongs_to_many :karyalay_caterer
end
