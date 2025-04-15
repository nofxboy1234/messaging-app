chats = Chat.limit(10)

chats.each do |chat|
  puts chat.as_json(include: :friendship)
  # puts chat.friendship.id
end

# s_chats = chats.as_json(include: :friendship)
# # s_chats = chats.as_json
# puts s_chats
