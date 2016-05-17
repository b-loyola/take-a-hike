Rails.application.routes.draw do

  get 'hikes/nearby'
  
  resources :hikes, only: [:index, :create, :show] do
    resources :reviews, only: [:new, :create]
  end

  resources :users

  resource :session, only: [:new, :create, :destroy]

  root to: 'welcome#index'

end
