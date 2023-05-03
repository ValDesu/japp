Rails.application.routes.draw do
  

  namespace :api do 
    namespace :v1 do
      resources :cards
      #resources :decks
      put '/decks/update', to: 'decks#update'
      get '/decks/edit', to: 'decks#edit'
      get '/decks/search', to: 'decks#search'
      post '/decks', to: 'decks#create'

      get '/jisho/:word', to: 'jisho#getWord'
      get '/jisho/common/:word', to: 'jisho#getCommonWord'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
