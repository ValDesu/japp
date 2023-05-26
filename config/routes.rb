Rails.application.routes.draw do
  

  namespace :api do 
    namespace :v1 do
      resources :cards
      #resources :decks
      post '/decks/review/update', to: 'decks#updateReview'
      post '/decks/review', to: 'decks#review'
      put '/decks/update', to: 'decks#update'
      get '/decks/edit', to: 'decks#edit'
      get '/decks/search', to: 'decks#search'
      post '/decks', to: 'decks#create'

      get '/jisho/:word', to: 'jisho#getWord'
      get '/jisho/common/:word', to: 'jisho#getCommonWord'

      post '/twitter/retrieve', to: 'twitter#retrieveSentences'

      post 'ip/free_try', to: 'ip_addresses#free_try'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
