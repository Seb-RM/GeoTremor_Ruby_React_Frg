class Api::FeaturesController < ApplicationController
  def index
  if params[:filters].present? && params[:filters][:magType].present?
    features = Feature.filter_by_mag_type(params[:filters][:magType])
  else
    features = Feature.all
  end

  features = features.page(params[:page]).per(params[:per_page])

  serialized_features = ActiveModel::Serializer::CollectionSerializer.new(
      features,
      serializer: FeatureSerializer
    )

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
