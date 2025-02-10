class DropRecoveryCodes < ActiveRecord::Migration[7.2]
  def change
    drop_table :recovery_codes
  end
end
