Rails.application.routes.draw do
  #resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'

  namespace :api do
    resources :users, only: [:index, :create]
    resources :provinces, only: :index
    resources :cities, only: :index
    resources :neighbourhoods, only: :index

    resource :user, only: [] do
      member do
        get :symptoms
        get :quarantined_status
        get :not_quarantined_status
      end
    end
  end
end
