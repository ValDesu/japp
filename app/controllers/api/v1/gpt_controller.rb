require 'faraday'
class Api::V1::GptController < ApplicationController

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

    def generateEnglish
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
                        "content": "Pretend to be an Japanese teacher for english students. You're an expert at creating exercices: given words you make sentences for the student to translate."
                    },
                    {
                        "role": "user",
                        "content": """With this set of japanese words : #{params['cards']}. Make an english sentence.
                        Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
                        [{
                          \"sentence_difficulty\":\"choose a CECRL level between A1 and C2 to generate the sentence difficulty\",
                          \"english_sentence\":\"the generated sentence in english\",
                          \"japanese_words_in_english_sentence\":\"using this RegEx : '(${english_words.join('|')})/gi' all the given words IN ENGLISH should be selected in the english sentence. Separated by a /.\",
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

    def correctEnglish
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
                        "content": """This japanese sentence \"#{params['japanese_sentence']}\" has been translated by a student in english as \"#{params['english_sentence']}\"
                        Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
                        [{
                            \"grade\": \"x/10\",
                            \"source_phrase\": \"#{params['japanese_sentence']}\",
                            \"proposed_correction\":\"your own english translation\",
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

    def correctJapanese
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
                        "content": """This english sentence \"#{params['japanese_sentence']}\" has been translated by a student in japanese as \"#{params['english_sentence']}\"
                        Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
                        [{
                            \"grade\": \"x/10\",
                            \"source_phrase\": \"#{params['japanese_sentence']}\",
                            \"proposed_correction\":\"your own japanese translation, be the most native-like\",
                            \"advice_grammar\":\"advice about the grammar you used in your proposed_correction\",
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

end