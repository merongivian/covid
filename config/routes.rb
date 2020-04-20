Rails.application.routes.draw do
  resources :provinces
  resources :cities
  resources :neighbourhoods
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users, only: [:index, :create]

    resource :user, only: [] do
      member do
        get :symptoms
        get :quarantined_status
        get :not_quarantined_status
      end
    end
  end
end
