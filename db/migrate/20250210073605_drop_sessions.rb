class DropSessions < ActiveRecord::Migration[7.2]
  def change
    drop_table :sessions
  end
end
