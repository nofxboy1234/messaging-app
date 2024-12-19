class ChatsController < ApplicationController
  before_action :set_chat, only: %i[ show ]

  # def index
  #   @chats = Current.user&.friends&.includes(:profile)&.map do |friend|
  #     chat = Current.user&.find_direct_message_chat_with(friend)
  #     { friend: friend.as_json(include: :profile), chat: chat }
  #   end

  #   render inertia: "Chat/Index", props: {
  #     initialChats: @chats
  #   }
  # end

  def show
    @serialized_chat = serialize_chat(@chat)
    render inertia: "Chat/Show", props: {
      chat: @serialized_chat
    }
  end

  private
    def chat_params
      params.require(:chat).permit(friendship: [ :id, :user_id, :friend_id ])
    end

    def set_chat
      @chat = Chat.includes(messages: [ :user ]).find(params[:id])
    end

    def serialize_chat(chat)
      chat.as_json(include: [
        { messages: { include: { user: { include: :profile } } } },
        { members: { include: :profile } }
      ])
    end
end
