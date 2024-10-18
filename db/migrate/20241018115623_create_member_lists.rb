class CreateMemberLists < ActiveRecord::Migration[7.2]
  def change
    create_table :member_lists do |t|
      t.references :chat, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
