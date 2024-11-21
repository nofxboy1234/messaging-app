Rails.application.routes.draw do
  resources :chats, only: [ :index, :create, :show ], export: true
  resources :friends, only: [ :index, :create, :destroy ], export: true
  resources :incoming_friends, only: [ :index, :destroy ], export: true
  resources :member_lists, only: [ :index, :create ], export: true
  resources :messages, only: [ :create, :index ], export: true
  resources :outgoing_friends, only: [ :create, :index, :destroy ], export: true
  resources :profiles, only: [ :edit, :show, :update ], export: true
  resources :users, only: [ :index ], export: true

  get  "sign_in", to: "sessions#new"
  post "sign_in", to: "sessions#create"
  get  "sign_up", to: "registrations#new", export: true
  post "sign_up", to: "registrations#create"

  resources :sessions, only: [ :index, :show, :destroy ], export: true
  resource  :password, only: [ :edit, :update ]
  namespace :identity do
    resource :email,              only: [ :edit, :update ]
    resource :email_verification, only: [ :show, :create ]
    resource :password_reset,     only: [ :new, :edit, :create, :update ]
  end
  namespace :two_factor_authentication do
    namespace :challenge do
      resource :totp,           only: [ :new, :create ]
      resource :recovery_codes, only: [ :new, :create ]
    end
    namespace :profile do
      resource  :totp,           only: [ :new, :create, :update ]
      resources :recovery_codes, only: [ :index, :create ]
    end
  end

  get  "/auth/failure",            to: "sessions/omniauth#failure"
  get  "/auth/:provider/callback", to: "sessions/omniauth#create"
  post "/auth/:provider/callback", to: "sessions/omniauth#create"

  root "friends#index"
  # root "inertia_example#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
  # mount ActionCable.server => "/websocket"
end
