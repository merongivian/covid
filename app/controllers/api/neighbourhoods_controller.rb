module Api
  class NeighbourhoodsController < ApplicationController
    def index
      render json: Neighbourhood.all
    end
  end
end
