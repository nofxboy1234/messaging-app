class RemoveAuthenticationZeroColumnsFromUsers < ActiveRecord::Migration[7.2]
  def change
    remove_column :users, :password_digest, :string
    remove_column :users, :verified, :boolean
    remove_column :users, :otp_required_for_sign_in, :boolean
    remove_column :users, :otp_secret, :string
    remove_column :users, :provider, :string
    remove_column :users, :uid, :string
  end
end
