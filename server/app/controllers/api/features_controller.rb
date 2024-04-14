class Api::FeaturesController < ApplicationController
  def index
  if params[:mag_type].present?
    features = Feature.filter_by_mag_type(params[:mag_type])
  else
    features = Feature.all
  end

  features = features.page(params[:page]).per(params[:per_page])

  serialized_features = features.map do |feature|
    {
      id: feature.id,
      type: 'feature',
      attributes: {
        external_id: feature.external_id,
        magnitude: feature.magnitude,
        place: feature.place,
        time: feature.time,
        tsunami: feature.tsunami,
        mag_type: feature.magType,
        title: feature.title,
        coordinates: {
          longitude: feature.longitude,
          latitude: feature.latitude
        }
      },
      links: {
        external_url: feature.external_url
      }
    }
  end

  render json: {
    data: serialized_features,
    pagination: pagination_data(features)
  }, status: :ok
  end

  private

  def pagination_data(collection)
    total_pages = (collection.total_count.to_f / collection.limit_value).ceil
    {
      current_page: collection.current_page,
      total: total_pages,
      per_page: collection.limit_value
    }
  end
end
