Rails.application.routes.draw do
  resources :friendships
  resources :chats
  resources :profiles, only: [ :create, :edit, :show, :update ]
  resources :messages, only: [ :create ]

  # get "friendships/pending", to: "friendships#pending", as: "pending_friends"
  # post "friendships/pending", to: "friendships#send_request", as: nil
  # delete "friendships/pending/:user_id", to: "friendships#cancel_request", as: "pending_friend"

  # get "friendships/requested", to: "friendships#requested", as: "requested_friends"
  # patch "friendships/requested/:user_id", to: "friendships#accept", as: nil
  # put "friendships/requested/:user_id", to: "friendships#accept", as: nil
  # delete "friendships/requested/:user_id", to: "friendships#decline", as: "requested_friend"

  # get "friendships/accepted", to: "friendships#accepted", as: "accepted_friends"
  # delete "friendships/accepted/:user_id", to: "friendships#remove", as: "accepted_friend"

  # get "friendships/blocked", to: "friendships#blocked", as: "blocked_friends"

  # patch "friendships/:user_id", to: "friendships#block", as: "friend"
  # put "friendships/:user_id", to: "friendships#block"
  # delete "friendships/:user_id", to: "friendships#unblock"

  # get "persisted_chat/index"

  get  "sign_in", to: "sessions#new"
  post "sign_in", to: "sessions#create"
  get  "sign_up", to: "registrations#new"
  post "sign_up", to: "registrations#create"

  resources :sessions, only: [ :index, :show, :destroy ]
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

  root "home#index"
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
