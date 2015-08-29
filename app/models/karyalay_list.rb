class KaryalayList < ActiveRecord::Base
  has_and_belongs_to_many :karyalay_pandits
  has_and_belongs_to_many :karyalay_caterers
  has_many :karyalay_attributes
end
