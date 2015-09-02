class KaryalayListsSamagris < ActiveRecord::Base
  belongs_to :karyalay_list
  belongs_to :karyalay_samagri
  validates_presence_of :quantity
end
