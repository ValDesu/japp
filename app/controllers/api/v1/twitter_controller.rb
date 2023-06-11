require 'faraday'

class Api::V1::TwitterController < ApplicationController
    
    # POST /twitter
    def retrieveTweets
        #Check if tweets are already saved in database for this word
        puts "checking if tweets exist"
        @tweets = Tweet.where(slug: params[:word])
        puts @tweets.length
        #if tweets exist, return randomly 2 of them
        if @tweets.length > 0
            puts "tweets exist"
            @tweets = @tweets.sample(2)
            render json: @tweets
        end

        #tweets don't exist, retrieve them from Twitter API
        # Set up the Twitter API client using your API keys
        #https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query
        conn = Faraday.new('https://api.twitter.com/1.1/search/tweets.json') do |faraday|
            faraday.headers['Authorization'] = "Bearer #{ENV['TWITTER_API_BEARER_TOKEN']}"
            faraday.headers['Content-Type'] = 'application/json'
            faraday.adapter Faraday.default_adapter
          end
      
          # Send the API request
          response = conn.get do |req|
            req.params['query'] = params[:word]
            req.params['tweet.fields'] = 'created_at,public_metrics'
            req.params['expansions'] = 'author_id'
            req.params['user.fields'] = 'username'
            req.params['max_results'] = 10
            req.params['result_type'] = 'popular'
          end

        puts "sending request"
        if response.status == 200
            puts "success"
            # Parse the JSON response
            tweets = JSON.parse(response.body)

            # Extract the relevant information from the tweets
            extracted_tweets = tweets['statuses'].map do |tweet|
            {
                id: tweet['id'],
                text: tweet['text'],
                user: tweet['user']['screen_name'],
                created_at: tweet['created_at'],
            }
            end

            # Save the tweets to the database
            extracted_tweets.each do |tweet|
                Tweet.create({
                    slug: params[:word],
                    tweet_id: tweet[:id],
                    text: tweet[:text],
                    user: tweet[:user],
                    created_at: tweet[:created_at]
                })
            end

            render json: {tweets: extracted_tweets, from_twitter: true}
        else
            puts "failure"
            # Handle the API request failure
            error_message = JSON.parse(response.body)
            render json: {error: error_message}, status: :unprocessable_entity
        end
    end

    #Because Twitter API is too expensive, I'm using a free API to get Japanese sentences
    #https://tatoeba.org/fr/api_v0/search?from=ja&query=params[:word]&sort=random&max=2
    def retrieveSentences 
        conn = Faraday.new('https://tatoeba.org/en/api_v0/search') do |faraday|
            faraday.headers['Content-Type'] = 'application/json'
            faraday.adapter Faraday.default_adapter
          end
      
          # Send the API request
          response = conn.get do |req|
            req.params['from'] = 'ja'
            req.params['to'] = 'en'
            req.params['query'] = params[:word]
            req.params['sort'] = 'random'
          end

        puts "sending request"
        if response.status == 200
            puts "success"
            # Parse the JSON response
            sentences = JSON.parse(response.body)['results']
            # filter sentences where lang = "jpn"
            begin
                sentences = sentences.select! {|sentence| sentence['lang'] == 'jpn'}
                # TODO: receive lang as parameter
                # filter where at least one sentences[translations][0] is lang = "eng"
                sentences = sentences.select! {|sentence| sentence['translations'][0].select! {|translation| translation['lang'] == 'eng'}}
                render json: {sentences: sentences.sample(1), from_twitter: false}
            rescue
                render json: {sentences: [], from_twitter: false}
            end
        else
            puts "failure"
            # Handle the API request failure
            render json: {error: "Could not get sentences"}, status: :unprocessable_entity
        end
    end
end