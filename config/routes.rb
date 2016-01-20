Rails.application.routes.draw do
  root 'chatrooms#index'

  # serve the same file as the root, react router will figure out what to do
  # exactly with it
  get '/emoji'    => 'chatrooms#index'
  get '/messages' => 'chatrooms#messages'
  post '/giphy'   => 'chatrooms#giphy'

  resources :emojis, only: [:index, :create]
end
