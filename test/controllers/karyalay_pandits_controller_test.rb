require 'test_helper'

class KaryalayPanditsControllerTest < ActionController::TestCase
  setup do
    @karyalay_pandit = karyalay_pandits(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:karyalay_pandits)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create karyalay_pandit" do
    assert_difference('KaryalayPandit.count') do
      post :create, karyalay_pandit: {  }
    end

    assert_redirected_to karyalay_pandit_path(assigns(:karyalay_pandit))
  end

  test "should show karyalay_pandit" do
    get :show, id: @karyalay_pandit
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @karyalay_pandit
    assert_response :success
  end

  test "should update karyalay_pandit" do
    patch :update, id: @karyalay_pandit, karyalay_pandit: {  }
    assert_redirected_to karyalay_pandit_path(assigns(:karyalay_pandit))
  end

  test "should destroy karyalay_pandit" do
    assert_difference('KaryalayPandit.count', -1) do
      delete :destroy, id: @karyalay_pandit
    end

    assert_redirected_to karyalay_pandits_path
  end
end
