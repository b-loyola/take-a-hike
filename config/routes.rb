Rails.application.routes.draw do

  resources :hikes, only: [:index, :create, :show] #do
  #   resources :ratings
  # end

  resources :users, only: [:index, :new, :create, :update, :destroy]

end
