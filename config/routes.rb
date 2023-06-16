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
      get '/decks/autofind', to: 'decks#autofind'
      post '/decks', to: 'decks#create'
      delete '/decks', to: 'decks#destroy'

      get '/jisho/:word', to: 'jisho#getWord'
      get '/jisho/common/:word', to: 'jisho#getCommonWord'

      post '/twitter/retrieve', to: 'twitter#retrieveSentences'

      post 'ip/free_try', to: 'ip_addresses#free_try'
      post 'ip/register_ip', to: 'ip_addresses#register_ip'

      #get 'gpt/test', to: 'gpt#test_gpt_api'
      post 'gpt/generate/japanese', to: 'gpt#generateJapanese'
      post 'gpt/correct/english', to: 'gpt#correctEnglish'
      post 'gpt/generate/english', to: 'gpt#generateEnglish'
      post 'gpt/correct/japanese', to: 'gpt#correctJapanese'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
