class FeatureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :external_id, :magnitude, :place, :time, :tsunami, :magType, :title

  attribute :coordinates do |object|
    { longitude: object.longitude, latitude: object.latitude }
  end

  attribute :links do |object|
    { external_url: object.external_url }
  end

  set_type :feature
end
