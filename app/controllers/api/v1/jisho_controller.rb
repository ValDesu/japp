require 'faraday'

class Api::V1::JishoController < ApplicationController

  # GET /jisho
  def getWord()
    word = params[:word]
    conn = Faraday.new(
      url: 'https://jisho.org',
      params: {keyword: word},
      headers: {'Content-Type' => 'application/json'}
    )

    render json: conn.get('/api/v1/search/words').body
  end

  # GET /common/jisho
  def getCommonWord()
    word = params[:word]
    conn = Faraday.new(
      url: 'https://jisho.org',
      params: {keyword: word},
      headers: {'Content-Type' => 'application/json'}
    )

    json_reponse = JSON.parse conn.get('/api/v1/search/words').body
    json_reponse['data'].select! { |data| data['is_common'] }

    render json: json_reponse
  end

end
