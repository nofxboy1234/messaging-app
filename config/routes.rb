Rails.application.routes.draw do
  root "friendships#index"

  resources :pending_friends, as: :friend_requests, controller: :friend_requests,
             only: %i[index create destroy], export: true

  resources :friends, as: :friendships, controller: :friendships,
             only: %i[index create destroy], export: true
  resources :friend_categories, controller: :friendship_categories, only: [ :index ], export: true

  resources :chats, only: [ :show, :index ], export: true
  resources :users, only: [ :index ], export: true
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
  resources :per_user_all_users_broadcast, only: [ :create ], export: true
  resources :send_message_broadcast, only: [ :create ], export: true

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
