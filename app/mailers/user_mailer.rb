class UserMailer < MandrillMailer::MessageMailer
  default from: 'poorva.mahajan@vertisinfotech.com'

  def send_new_user_message(user)
    mandrill_mail subject: 'Confimation Email',
                  to: user.email,
                  text: 'Example text content',
                  html: '<p>Example HTML content</p>',
                  # when you need to see the content of individual emails sent to users
                  view_content_link: true,
                  vars: {
                    'OWNER_NAME' => 'Poorva Mahajan',
                    'PROJECT_NAME' => 'Karyalay Application'
                  },
                  important: true,
                  inline_css: true,
                  recipient_vars:
                    [{ 'poorva.mahajan2990@gmail.com' =>
                      { 'INVITEE_NAME' => 'Poorva Mahajan' }
                    }]
  end
end
