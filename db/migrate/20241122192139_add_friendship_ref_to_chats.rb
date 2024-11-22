class AddFriendshipRefToChats < ActiveRecord::Migration[7.2]
  def change
    add_reference :chats, :friendship, null: true, foreign_key: true
  end
end
