module API
  class UsersController < ApiController
    def index
      render json: User.all
    end

    def create
      user = User.new(user_params)

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
        :coordinates,
        :province,
        :city,
        :neighbourhood
      )
    end
  end
end
