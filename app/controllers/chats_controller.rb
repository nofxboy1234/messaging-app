class ChatsController < ApplicationController
  before_action :set_chat, only: %i[ show ]

  def show
    @serialized_chat = serialize_chat(@chat)
    render inertia: "Chat/Show", props: {
      chat: @serialized_chat
    }
  end

  def create
    friendship = chat_params[:friendship]
    @friendship = Friendship.find(friendship[:id])
    @direct_message_chat = Chat.find_by(friendship: @friendship)

    unless @direct_message_chat
      @direct_message_chat = Chat.create!(
        friendship: @friendship
      )

      user1 = User.find(friendship[:user_id])
      user2 = User.find(friendship[:friend_id])
      @direct_message_chat.members << [ user1, user2 ]
    end

    redirect_to @direct_message_chat
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
