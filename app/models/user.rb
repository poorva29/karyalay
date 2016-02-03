class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  belongs_to :role
  has_many :karyalay_lists
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  after_create :send_create_mail

  def role?(selected_role)
    role.name.eql?(selected_role)
  end

  def send_create_mail
    UserMailer.send_new_user_message(self).deliver
  end
end
