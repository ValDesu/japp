require 'faraday'
class Api::V1::GptController < ApplicationController

    #GET /test
    def test_gpt_api
        conn = Faraday.new('https://api.openai.com/v1/chat/completions') do |faraday|
            faraday.headers['Authorization'] = "Bearer #{ENV['gpt_api_key']}"
            faraday.headers['Content-Type'] = 'application/json'
            faraday.adapter Faraday.default_adapter
        end

        response = conn.post do |req|
            req.body = {
                model: "gpt-3.5-turbo",
                temperature: 0.9,
                max_tokens: 255,
                messages: [
                    {
                        "role": "system",
                        "content": "Pretend to be a Japanese teacher. You're an expert at teaching, giving good advices and grading students. You're giving the most native-like answers."
                    },
                    {
                        "role": "user",
                        "content": """This english sentence \"Hello, my name is Tom\" has been translated by a student in japanese as \"こんにちは、私はトムです\".
                        Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
                        [{
                            \"grade\": \"x/10\",
                            \"source_phrase\": \"the phrase to be translated\",
                            \"proposed_correction\":\"your own translation\",
                            \"proposed_correction_hiragana\":\"the proposed correction using spacing and hiraganas next to kanjis for easy reading, like : 私(わたし)\"
                            \"advice_grammar\":\"advice about the grammar used in japanese translation\",
                            \"advice_general\": \"a general advice for the student to do better next time\"
                        }]
                        The JSON response:"""
                    }]
                }.to_json
        end

        puts "sending request"
        if response.status == 200
            puts "success"
            # Parse the JSON response
            render json: response.body
        else
            puts "error"
            render json: response
        end
    end

    def generateJapanese
        conn = Faraday.new('https://api.openai.com/v1/chat/completions') do |faraday|
            faraday.headers['Authorization'] = "Bearer #{ENV['gpt_api_key']}"
            faraday.headers['Content-Type'] = 'application/json'
            faraday.adapter Faraday.default_adapter
        end

        response = conn.post do |req|
            req.body = {
                model: "gpt-3.5-turbo",
                temperature: 0.9,
                max_tokens: 255,
                messages: [
                    {
                        "role": "system",
                        "content": "Pretend to be a Japanese teacher. You're an expert at creating exercices: given words you make sentences for the student to translate."
                    },
                    {
                        "role": "user",
                        "content": """Generate a Japanese sentence using at least the all the following words : #{params['cards']}. 
                        Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
                        [{
                          \"sentence_difficulty\":\"choose randomly a level between JLPT N5 to N1 to generate the sentence difficulty\",
                          \"japanese_sentence\":\"the generated sentence in japanese\",
                          \"japanese_sentence_hiragana\":\"using spacing between each words and only hiraganas instead of kanji\"
                        }]
                        The JSON response:"""
                    }]
                }.to_json
        end

        puts "sending request"
        if response.status == 200
            puts "success"
            # Parse the JSON response
            render json: response.body
        else
            puts "error"
            render json: response
        end
    end

end