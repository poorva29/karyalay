class Photo < ActiveRecord::Base
  belongs_to :karyalay_list
  has_attached_file :gallery, styles: { medium: '300x300>', thumb: '100x100>' },
                              default_url: '/images/:style/missing.png'
  validates_attachment_content_type :gallery, content_type: /\Aimage\/.*\Z/
end