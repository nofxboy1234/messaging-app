class ChatsController < ApplicationController
  before_action :set_chat, only: %i[ show ]

  rescue_from ActionPolicy::Unauthorized do |ex|
    redirect_back_or_to root_url, alert: "You are not authorized to show that chat"
  end

  def index
    @chats = current_user.chats_with_friends

    render inertia: "Chat/Index", props: {
      initialChats: @chats
    }
  end

  def show
    authorize! @chat

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
      @chat = Chat.includes(messages: { user: :profile },
                            members: :profile,
                            friendship: [])
                  .joins(members: :profile)
                  .order("messages.created_at", "profiles.username")
                  .find(params[:id])
    end
end
