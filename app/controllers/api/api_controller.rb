module Api
  class ApiController < ActionController::Base
    protect_from_forgery with: :exception
  end
end
