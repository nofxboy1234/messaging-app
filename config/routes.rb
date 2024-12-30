Rails.application.routes.draw do
  root "friendships#index"

  # resources :photos, only: %i[new edit create update] do
  #   resource :featured_flag, only: %i[create destroy]
  # end

  resources :pending_friends, as: :friend_requests, controller: :friend_requests,
             only: %i[index create destroy], export: true

  resources :friends, as: :friendships, controller: :friendships,
             only: %i[index create destroy], export: true

  resources :chats, only: [ :show ], export: true
  resources :member_lists, only: [ :index, :create ], export: true
  resources :messages, only: [ :create, :index ], export: true
  resources :profiles, only: [ :edit, :show, :update ], export: true
  resources :send_friend_request_broadcast, only: [ :create ], export: true
  resources :accept_friend_request_broadcast, only: [ :create ], export: true
  resources :reject_friend_request_broadcast, only: [ :create ], export: true
  resources :cancel_friend_request_broadcast, only: [ :create ], export: true
  resources :unfriend_broadcast, only: [ :create ], export: true
  resources :profile_broadcast, only: [ :create ], export: true
  resources :chat_users_broadcast, only: [ :create ], export: true
  resources :all_users_broadcast, only: [ :create ], export: true

  get  "sign_in", to: "sessions#new"
  post "sign_in", to: "sessions#create", export: true
  get  "sign_up", to: "registrations#new", export: true
  post "sign_up", to: "registrations#create", export: true

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
