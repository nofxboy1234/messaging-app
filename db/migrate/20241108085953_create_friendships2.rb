class CreateFriendships2 < ActiveRecord::Migration[7.2]
  def change
    create_table :friendships do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :friend, null: false

      t.timestamps
    end

    add_foreign_key :friendships, :users, column: :friend_id
  end
end
