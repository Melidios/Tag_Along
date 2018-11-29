class UserEventsController < ApplicationController
  before_action :set_event

  def create
    UserEvent.find_or_create_by(
      event: @event,
      user: current_user
    )
    head :ok
  end

  def destroy
    UserEvent.where(
      event: @event,
      user: current_user
    ).destroy_all
    head :ok
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end

end
