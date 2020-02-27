Rails.application.routes.draw do
  resources :prefectures

  root to: 'top#index'
  # get '/items/:id/edit', to: 'items#edit', as: 'item'

  resources :items, only: [:new, :create, :show, :edit, :update] do
    collection do
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
    end
  end


  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'
  }
  resources :orders, only: [:new]
  devise_scope :user do
    get "user/:id", :to => "users/registrations#detail"
    get "signup", :to => "users/registrations#new"
    get "login", :to => "users/sessions#new"
    get "logout", :to => "users/sessions#destroy"
  end
  resources :mypage, only: [:index]
end
