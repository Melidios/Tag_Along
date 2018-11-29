class ActivitiesController < ApplicationController
  def index
    @activities = Activity.all
    respond_to do |format|
      format.html
      if params[:find] == "activities"
        format.json{render json: Activity.all}
      elsif params[:find] == "basketball"
        format.json{render json: Activity.loc_basketball}
      elsif params[:find] == "biking"
        format.json{render json: Activity.loc_biking}
      elsif params[:find] == "golf"
        format.json{render json: Activity.loc_golf}
      elsif params[:find] == "baseball"
        format.json{render json: Activity.loc_baseball}
      elsif params[:find] == "tennis"
        format.json{render json: Activity.loc_tennis}
      elsif params[:find] == "volleyball"
        format.json{render json: Activity.loc_volleyball}
      end
    end
  end
  def update
     @activity = current_user.activity.update(activity_params)
  end
end
