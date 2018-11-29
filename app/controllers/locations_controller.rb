class LocationsController < ApplicationController
  def index
    respond_to do |format|
      @locations = Location.all
      format.html
      format.json do
        render json:  {
                       type: "FeatureCollection",
                       features: @locations.map do |location|
                         {
                           type: "Feature",
                           geometry: {
                             type: "Point",
                             coordinates: [location.longitude, location.latitude]
                           },
                           properties: {
                             name: location.name,
                             id: location.id
                           }
                         }
                       end
                     }

      end
    end
  end

  def show
    activity = Activity.find_by(name: params[:id].titleize)
    locations = activity.locations

    render json:  {
                   type: "FeatureCollection",
                   features: locations.map do |location|
                     {
                       type: "Feature",
                       geometry: {
                         type: "Point",
                         coordinates: [location.longitude, location.latitude]
                       },
                       properties: {
                         name: location.name,
                         id: location.id
                       }
                     }
                   end
                 }

  end
end
