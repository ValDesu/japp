require "test_helper"

class JishoControllerTest < ActionDispatch::IntegrationTest
  test "should get getWord" do
    get jisho_getWord_url
    assert_response :success
  end
end
