module Api
  class ProvincesController < ApplicationController
    def index
      render json: Province.all
    end
  end
end
