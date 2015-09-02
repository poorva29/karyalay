require 'test_helper'

class KaryalaySamagrisControllerTest < ActionController::TestCase
  setup do
    @karyalay_samagri = karyalay_samagris(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:karyalay_samagris)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create karyalay_samagri" do
    assert_difference('KaryalaySamagri.count') do
      post :create, karyalay_samagri: {  }
    end

    assert_redirected_to karyalay_samagri_path(assigns(:karyalay_samagri))
  end

  test "should show karyalay_samagri" do
    get :show, id: @karyalay_samagri
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @karyalay_samagri
    assert_response :success
  end

  test "should update karyalay_samagri" do
    patch :update, id: @karyalay_samagri, karyalay_samagri: {  }
    assert_redirected_to karyalay_samagri_path(assigns(:karyalay_samagri))
  end

  test "should destroy karyalay_samagri" do
    assert_difference('KaryalaySamagri.count', -1) do
      delete :destroy, id: @karyalay_samagri
    end

    assert_redirected_to karyalay_samagris_path
  end
end
