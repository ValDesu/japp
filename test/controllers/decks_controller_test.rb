require "test_helper"

class DecksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @deck = decks(:one)
  end

  test "should get index" do
    get decks_url, as: :json
    assert_response :success
  end

  test "should create deck" do
    assert_difference("Deck.count") do
      post decks_url, params: { deck: { name: @deck.name, password: @deck.password } }, as: :json
    end

    assert_response :created
  end

  test "should show deck" do
    get deck_url(@deck), as: :json
    assert_response :success
  end

  test "should update deck" do
    patch deck_url(@deck), params: { deck: { name: @deck.name, password: @deck.password } }, as: :json
    assert_response :success
  end

  test "should destroy deck" do
    assert_difference("Deck.count", -1) do
      delete deck_url(@deck), as: :json
    end

    assert_response :no_content
  end
end
