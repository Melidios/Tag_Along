class MessagesController < ApplicationController
  before_action :set_event

  def create
    @message = @event.messages.new(message_params)
    @message.user = current_user
    @message.save!
    redirect_to @event
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end

  def message_params
    params.require(:message).permit(:body)
  end

end
