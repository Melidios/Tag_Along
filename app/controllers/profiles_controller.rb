class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :edit, :update, :destroy]

  # GET /profiles
  # GET /profiles.json
  def index
    respond_to do |format|
      format.html do
        @profile = Profile.new
        @profile.user = current_user
      end
      format.json do
        @profiles = Profile.all
        render json: @profiles
      end
    end
  end

  # GET /profiles/1
  # GET /profiles/1.json
  def show
    @user = @profile.user
    @activities = @user.activities
    @events = Event.where(user_id: @profile.user.id)
  end

  # GET /profiles/new
  def new
    @profile = Profile.new
    @activities = Activity.all
  end

  def create
    activities = params[:profile][:activity_id].split(",")
    @profile = Profile.new
    @profile.first_name = params[:profile][:first_name]
    @profile.last_name = params[:profile][:last_name]
    @profile.gender = params[:profile][:gender]
    @profile.notification = params[:profile][:notification]
    @profile.image = params[:profile][:image]
    @profile.user = current_user
    @profile.save
      @profile.user.user_activities.delete_all
      activities.each do |activity_id|
        @profile.user.user_activities.find_or_create_by(activity_id: activity_id)
      end
      render json: @profile
  end

  # GET /profiles/1/edit
  def edit
  end

  # POST /profiles
  # POST /profiles.json
  # def create
  #   @profile = Profile.new(profile_params)
  #   @profile.user = current_user
  #
  #   respond_to do |format|
  #     if @profile.save
  #       format.html { redirect_to @profile, notice: 'Profile was successfully created.' }
  #       format.json { render :show, status: :created, location: @profile }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @profile.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # PATCH/PUT /profiles/1
  # PATCH/PUT /profiles/1.json
  def update
    respond_to do |format|
      if @profile.update(profile_params)
        format.html { redirect_to @profile, notice: 'Profile was successfully updated.' }
        format.json { render :show, status: :ok, location: @profile }
      else
        format.html { render :edit }
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /profiles/1
  # DELETE /profiles/1.json
  def destroy
    @profile.destroy
    respond_to do |format|
      format.html { redirect_to profiles_url, notice: 'Profile was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def profile_params
      params.require(:profile).permit!
    end
    def user_activity_params
      params.require(:user_activity).permit!
    end
end
