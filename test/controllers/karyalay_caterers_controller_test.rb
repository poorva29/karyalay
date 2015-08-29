require 'test_helper'

class KaryalayCaterersControllerTest < ActionController::TestCase
  setup do
    @karyalay_caterer = karyalay_caterers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:karyalay_caterers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create karyalay_caterer" do
    assert_difference('KaryalayCaterer.count') do
      post :create, karyalay_caterer: {  }
    end

    assert_redirected_to karyalay_caterer_path(assigns(:karyalay_caterer))
  end

  test "should show karyalay_caterer" do
    get :show, id: @karyalay_caterer
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @karyalay_caterer
    assert_response :success
  end

  test "should update karyalay_caterer" do
    patch :update, id: @karyalay_caterer, karyalay_caterer: {  }
    assert_redirected_to karyalay_caterer_path(assigns(:karyalay_caterer))
  end

  test "should destroy karyalay_caterer" do
    assert_difference('KaryalayCaterer.count', -1) do
      delete :destroy, id: @karyalay_caterer
    end

    assert_redirected_to karyalay_caterers_path
  end
end
