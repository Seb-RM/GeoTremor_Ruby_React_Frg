class Api::V1::FeaturesController < ApplicationController
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

    render json: serialized_features, status: :ok
  end
end
