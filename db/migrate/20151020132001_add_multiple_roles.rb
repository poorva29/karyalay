class AddMultipleRoles < ActiveRecord::Migration
  def up
    Role.create(name: 'Admin')
    Role.create(name: 'Visitor')
  end
end
