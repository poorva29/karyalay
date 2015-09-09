class KaryalayList < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :karyalay_pandits
  has_and_belongs_to_many :karyalay_caterers
  has_and_belongs_to_many :karyalay_samagris
  has_one :karyalay_attribute, dependent: :destroy
end
