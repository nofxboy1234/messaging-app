class ChatsController < ApplicationController
  before_action :set_chat, only: %i[ show edit update destroy ]

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
  def new
    @chat = Chat.new
    render inertia: "Chat/New", props: {
      chat: serialize_chat(@chat)
    }
  end

  # GET /chats/1/edit
  def edit
    render inertia: "Chat/Edit", props: {
      chat: serialize_chat(@chat)
    }
  end

  # POST /chats
  def create
    @chat = Chat.new(chat_params)

    if @chat.save
      redirect_to @chat, notice: "Chat was successfully created."
    else
      redirect_to new_chat_url, inertia: { errors: @chat.errors }
    end
  end

  # PATCH/PUT /chats/1
  def update
    if @chat.update(chat_params)
      redirect_to @chat, notice: "Chat was successfully updated."
    else
      redirect_to edit_chat_url(@chat), inertia: { errors: @chat.errors }
    end
  end

  # DELETE /chats/1
  def destroy
    @chat.destroy!
    redirect_to chats_url, notice: "Chat was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Only allow a list of trusted parameters through.
    def chat_params
      params.require(:chat).permit(:name)
    end

    def set_chat
      @chat = Chat.find(params[:id])
      # @chat = Chat.includes(messages: [ :user ]).find(params[:id])
      # @chat = Chat.includes(:messages).find(params[:id])
    end

    def serialize_chat(chat)
      chat.as_json(include: { messages: { include: :user } })
    end
end
