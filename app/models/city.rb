class City < ApplicationRecord
  has_many :neighbourhoods
  belongs_to :province
end
