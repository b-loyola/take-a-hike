Rails.application.routes.draw do

  # get '/hikes/query', to: 'hikes#query', as: 'query'

  resources :hikes, only: [:index, :create, :show] do
    resources :reviews, only: [:new, :create]
  end

  resources :users, only: [:index, :new, :create, :update, :destroy]

  resource :session, only: [:new, :create, :destroy]

  root to: 'welcome#index'

end
