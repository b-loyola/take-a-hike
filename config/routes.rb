Rails.application.routes.draw do

  get 'completed_hikes/create'

  resources :hikes, only: [:index, :create, :show] do
    resources :reviews, only: [:new, :create]
    resources :fave_hikes, only: [:create]
    resources :completed_hikes, only: [:create]
    collection do
      get :nearby
      get :filter
    end
  end

  resources :users 

  resource :session, only: [:new, :create, :destroy]

  root to: 'welcome#index'

end
