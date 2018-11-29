class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /events    @activities = Activity.all
  # GET /events.json
  def index
    @events = Event.joins(:location)
    respond_to do |format|
      format.html do
        @event = Event.new
      end
      format.json do
      render json: {
                     type: "FeatureCollection",
                     features: @events.map do |event|
                       {
                         type: "Feature",
                         geometry: {
                           type: "Point",
                           coordinates: [event.location.longitude, event.location.latitude]
                         },
                         properties: {
                            id: event.id,
                            title: event.title,
                            location: "/events/#{event.id}",
                            event_type: event.location.location_type,
                         }
                       }
                     end
                   }
      end


    end
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @user = @event.user
    @profile = @event.user.profile
    @participants = @event.participants.map{|p| p.profile }
    @activity = @event.activity
    respond_to do |format|
      format.html
      format.json{render json: @event.participants.map{|p| p.profile }}
      end
    end


  # GET /events/new
  def new
    if current_user.profile.nil?
      redirect_to new_profile_path
    end
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
    p params[:location][:id]
    @event = Event.new(event_params)
    @event.user = current_user
    @event.location = Location.find(params[:location][:id])
    @event.activity = Activity.find(params[:location][:activity_id])
    @event.save

    respond_to do |format|
      format.html
      format.json do
        render json: @event
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit!
    end

    def location_params
      params.require(:location).permit!
    end

end
