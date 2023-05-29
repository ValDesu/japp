class Api::V1::DecksController < ApplicationController

  # GET /decks
  def index
    @decks = Deck.all

    render json: @decks
  end

  #POST /decks/review/update
  def updateReview
    begin
      @deck = Deck.find(params[:deck_id].to_i)
    rescue
      render json: {error: "Deck not found."}, status: :not_found
    end

    @deck.done += 1
    @deck.save

    params[:reviewed_cards].each do |r_card|
      begin
        @card = Card.find(r_card[:card][:id].to_i)
      rescue
        #skip card if not found
        next
      end

      if r_card[:isCorrect]
        @card.correct += 1
      else
        @card.incorrect += 1
      end

      @card.save
    end

  end

  #POST /decks/review
  def review
    @deck = Deck.find(params[:deck_id].to_i)

    if !@deck
      render json: {error: "Deck not found."}, status: :not_found
    end

    @cards = @deck.cards
    @cards = @cards.shuffle

    #switch review mode
    case params[:review_setting][:reviewMode]
      when '1'
        #review all cards
      when '2'
        #review recently added cards
        @cards = @deck.cards.where("created_at > ?", 1.week.ago)
      when '3'
        #review cards with low accuracy
        @cards = @deck.cards.where("correct < incorrect")
    end

    #switch review with number of cards
    case params[:review_setting][:reviewWith]
      when '1'
        #review with all cards
      when '2'
        #review with 20 cards
        @cards = @cards.take(10)
        puts @cards.length
      when '3'
        #review with 40 cards
        @cards = @cards.take(20)
      when '4'
        #review with 60 cards
        @cards = @cards.take(30)
      when '5'
        #review with 80 cards
        @cards = @cards.take(40)
    end


    if @cards
      render json: @cards, status: :ok
    else
      render json: {error: "No cards found."}, status: :not_found
    end

  end

  #GET /decks/edit
  def edit
    if params[:name] && params[:password]
      @deck = Deck.find_by(name: params[:name], password: params[:password])
    end

    if @deck
      render json: @deck.to_json(include: :cards), status: :ok
    else
      render json: {error: "Name or Password might be wrong."}, status: :not_found
    end
  end

  # GET /decks/1
  def show
    render json: @deck
  end

  # GET /decks/search
  def search
    if !params[:name] || params[:name].empty?
      #if name empty, return all decks, order by number of "done" in descending order
      @decks = Deck.order(done: :desc).offset(params[:page]*6).limit(6)
    else
      #if name not empty, search for deck containing name, limit to 6 results
      @decks = Deck.order(done: :desc).where("name LIKE ?", "%#{params[:name]}%").offset(params[:page]*6).limit(6)    
    end

    if @decks
      #render json: @decks with cards relation, only include the first 3 cards
      render json: @decks.to_json(include: {cards: {only: [:slug]}}), status: :ok
      
    else
      render json: {error: "No match for this name."}, status: :not_found
    end
  end


  # POST /decks
  def create
    #get cards from params
    cards = params[:cards]
    #create deck
    @deck = Deck.new(deck_params)
    

    if @deck.save

      #delete the deck if error occurs while creating cards
      begin
        #create cards
        cards.each do |card|
          @deck.cards.create({
            slug: card[:slug],
            meanings: card[:meanings],
            reading: card[:reading],
            jlpt: card[:jlpt],
            isCommon: card[:isCommon],
            sentences: {},
            correct: 0,
            incorrect: 0,

            deck_id: @deck.id
          })
        end
      rescue
        @deck.destroy
        render json: {error: "Error creating cards"}, status: :unprocessable_entity
      end

      render json: @deck, status: :created
    else
      render json: @deck.errors, status: :unprocessable_entity
    end
  end



  # PATCH/PUT /decks/update
  def update
    @deck = Deck.find_by(name: params[:name], password: params[:password])

    if @deck

      @deck.cards.each do |card|
        if params[:cards].include?(card)
          #card exists in params, skip and remove from params
          params[:cards].delete(card)
        else
          #card does not exist in params, delete
          card.destroy
        end
      end
      
      params[:cards].each do |card|
        #card does not exist in deck, create
        @deck.cards.create({
          slug: card[:slug],
          meanings: card[:meanings],
          reading: card[:reading],
          jlpt: card[:jlpt],
          isCommon: card[:isCommon],
          sentences: {},
          correct: 0,
          incorrect: 0,

          deck_id: @deck.id
        })
      end

      render json: @deck, status: :ok
    else
      render json: {error: "Name or Password might be wrong."}, status: :not_found
    end
  end

  # DELETE /decks/1
  def destroy
    @deck.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deck
      @deck = Deck.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def deck_params
      params.require(:deck).permit(:name, :password)
    end
end
