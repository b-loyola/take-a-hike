Rails.application.routes.draw do

  get 'pictures/index'

  get 'pictures/show'

  get 'pictures/new'

  get 'pictures/edit'

  get 'completed_hikes/create'

  resources :hikes, only: [:index, :create, :show, :update] do
    resources :reviews, only: [:new, :create, :destroy]
    resources :fave_hikes, only: [:create, :destroy]
    resources :completed_hikes, only: [:create, :destroy]
    collection do
      get :nearby
      get :filter
    end
  end

  resources :users

  resources :pictures


  resource :session, only: [:new, :create, :destroy]

  root to: 'welcome#index'

end
