class Api::V1::DecksController < ApplicationController
  before_action :set_deck, only: %i[ show update destroy ]

  # GET /decks
  def index
    @decks = Deck.all

    render json: @decks
  end

  # GET /decks/1
  def show
    render json: @deck
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
            front: card[:slug],
            back: card[:senses].first[:english_definitions].first,
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



  # PATCH/PUT /decks/1
  def update
    if @deck.update(deck_params)
      render json: @deck
    else
      render json: @deck.errors, status: :unprocessable_entity
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
