class ChatsController < ApplicationController
  before_action :set_chat, only: %i[ show ]

  def index
    mapped_chats = current_user&.friends&.includes(:profile)&.map do |friend|
      chat = current_user&.find_direct_message_chat_with(friend)
      { friend: friend.serialize, chat: chat }
    end

    @chats = mapped_chats.sort { |chat_a, chat_b| chat_a[:friend]["profile"]["username"] <=> chat_b[:friend]["profile"]["username"] }

    render inertia: "Chat/Index", props: {
      initialChats: @chats
    }
  end

  def show
    @serialized_chat = @chat.serialize
    chatting_with = @chat.members.find { |member| member != current_user }
    @serialized_chatting_with = chatting_with.serialize

    render inertia: "Chat/Show", props: {
      chat: @serialized_chat,
      chattingWith: @serialized_chatting_with
    }
  end

  private
    def chat_params
      params.require(:chat).permit(friendship: [ :id, :user_id, :friend_id ])
    end

    def set_chat
      @chat = Chat.includes(messages: [ :user ]).order("messages.created_at").find(params[:id])
    end
end
