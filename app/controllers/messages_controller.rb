class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /messages
  def index
    @messages = Message.all
    render inertia: 'Message/Index', props: {
      messages: @messages.map do |message|
        serialize_message(message)
      end
    }
  end

  # GET /messages/1
  def show
    render inertia: 'Message/Show', props: {
      message: serialize_message(@message)
    }
  end

  # GET /messages/new
  def new
    @message = Message.new
    render inertia: 'Message/New', props: {
      message: serialize_message(@message)
    }
  end

  # GET /messages/1/edit
  def edit
    render inertia: 'Message/Edit', props: {
      message: serialize_message(@message)
    }
  end

  # POST /messages
  def create
    @message = Message.new(message_params)

    if @message.save
      redirect_to @message, notice: "Message was successfully created."
    else
      redirect_to new_message_url, inertia: { errors: @message.errors }
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      redirect_to @message, notice: "Message was successfully updated."
    else
      redirect_to edit_message_url(@message), inertia: { errors: @message.errors }
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy!
    redirect_to messages_url, notice: "Message was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body, :user_id)
    end

    def serialize_message(message)
      message.as_json(only: [
        :id, :body, :user_id
      ])
    end
end
