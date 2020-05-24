module Api
  class UsersController < ApiController
    def index
      render json: User.all
    end

    def symptoms
      render json: User::SYMPTOMS
    end

    def quarantined_status
      render json: User::QUARANTINED_STATUS
    end

    def not_quarantined_status
      render json: User::NOT_QUARANTINED_STATUS
    end

    def create
      user = User.new(user_params)
      user.province = Province.find_by(name: 'Pichincha')
      user.city = City.find_by(name: 'Quito')
      user.neighbourhood = Neighbourhood.find_by(name: 'Chillogallo')

      if user.save!
        render json: { user: user }
      else
        render json: user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(
        :age,
        :sex,
        :zip_code,
        :tested,
        :contact_with_sick_person,
        :symptoms,
        :with_severe_illness,
        :isolation_status,
        :smoking_habits,
        :temperature,
        :privacy_agreement,
        :coordinates
      )
    end
  end
end
