class Feature < ApplicationRecord

    validates :external_id, :place, :external_url, :magType, :title, presence: true
    validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
    validates :latitude, presence: true, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
    validates :longitude, presence: true, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }

    def self.filter_by_mag_type(mag_type)
        if mag_type.present?
            where(magType: mag_type)
        else
            all
        end
    end
end
