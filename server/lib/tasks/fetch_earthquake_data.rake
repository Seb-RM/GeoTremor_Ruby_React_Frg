require 'httparty'

namespace :fetch_earthquake_data do
  desc "Fetch earthquake data from USGS"
  task fetch: :environment do
    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
    response = HTTParty.get(url)
    
    if response.code == 200
      features = JSON.parse(response.body)["features"]
      features.each do |feature|
        properties = feature["properties"]
        coordinates = feature["geometry"]["coordinates"]

       
        next if invalid_data?(properties, coordinates)

        
        Feature.create!(
          external_id: feature["id"],
          magnitude: properties["mag"],
          place: properties["place"],
          time: properties["time"],
          external_url: properties["url"],
          tsunami: properties["tsunami"] == 1,
          magType: properties["magType"],
          title: properties["title"],
          latitude: coordinates[1],
          longitude: coordinates[0]
        )
      end
    else
      puts "Error al obtener datos sísmicos: #{response.code}"
    end
  end

  def invalid_data?(properties, coordinates)
    properties["title"].nil? || properties["url"].nil? || properties["place"].nil? ||
    properties["magType"].nil? || coordinates[0].nil? || coordinates[1].nil? ||
    properties["mag"] < -1.0 || properties["mag"] > 10.0 ||
    coordinates[1] < -90.0 || coordinates[1] > 90.0 ||
    coordinates[0] < -180.0 || coordinates[0] > 180.0
  end
end
