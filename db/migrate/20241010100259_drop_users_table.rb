class DropUsersTable < ActiveRecord::Migration[7.2]
  def up
    drop_table :users
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "This migration cannot be reverted because it destroys data."
  end
end
