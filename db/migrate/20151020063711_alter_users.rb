class AlterUsers < ActiveRecord::Migration
  def up
    add_column :users, :role_id, :integer, index: true, null: false, default: Role.first.id
  end

  def down
    remove_column :users, :role_id
  end
end
