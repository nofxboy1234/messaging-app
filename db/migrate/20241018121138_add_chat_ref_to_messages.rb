class AddChatRefToMessages < ActiveRecord::Migration[7.2]
  def change
    add_reference :messages, :chat, null: false, foreign_key: true
  end
end
