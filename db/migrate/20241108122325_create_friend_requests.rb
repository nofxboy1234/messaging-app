class CreateFriendRequests < ActiveRecord::Migration[7.2]
  def change
    create_table :friend_requests do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :friend, null: false

      t.timestamps
    end

    add_foreign_key :friend_requests, :users, column: :friend_id
  end
end
