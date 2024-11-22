class ChatsController < ApplicationController
  before_action :set_chat, only: %i[ show ]

  inertia_share flash: -> { flash.to_hash }

  # GET /chats
  def index
    @chats = Chat.all
    render inertia: "Chat/Index", props: {
      chats: @chats.map do |chat|
        serialize_chat(chat)
      end
    }
  end

  # GET /chats/1
  def show
    @serialized_chat = serialize_chat(@chat)
    render inertia: "Chat/Show", props: {
      chat: @serialized_chat
    }
  end

  # GET /chats/new
  # def new
  #   @chat = Chat.new
  #   render inertia: "Chat/New", props: {
  #     chat: serialize_chat(@chat)
  #   }
  # end

  # GET /chats/1/edit
  # def edit
  #   render inertia: "Chat/Edit", props: {
  #     chat: serialize_chat(@chat)
  #   }
  # end

  # POST /chats
  def create
    debugger
    current_user = Current.user
    @friend = User.find(chat_params[:id])
    @direct_message_chat = current_user.find_direct_message_chat_with(@friend)

    unless @direct_message_chat
      @direct_message_chat = Chat.create!(
        name: "#{current_user.profile.username}_#{@friend.profile.username}"
      )
      @direct_message_chat.members << [ current_user, @friend ]
    end

    redirect_to @direct_message_chat
  end

  # PATCH/PUT /chats/1
  # def update
  #   if @chat.update(chat_params)
  #     redirect_to @chat, notice: "Chat was successfully updated."
  #   else
  #     redirect_to edit_chat_url(@chat), inertia: { errors: @chat.errors }
  #   end
  # end

  # DELETE /chats/1
  # def destroy
  #   @chat.destroy!
  #   redirect_to chats_url, notice: "Chat was successfully destroyed."
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Only allow a list of trusted parameters through.
    def chat_params
      params.fetch(:chat)
      # params.require(:chat).permit(:friend)
    end

    def set_chat
      @chat = Chat.includes(messages: [ :user ]).find(params[:id])
      # @chat = Chat.includes(:messages).find(params[:id])
      # @chat = Chat.find(params[:id])
    end

    def serialize_chat(chat)
      chat.as_json(include: [ { messages: { include: :user } }, { members: { include: :profile } } ])
    end
end
