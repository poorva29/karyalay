require 'test_helper'

class KaryalayListsControllerTest < ActionController::TestCase
  setup do
    @karyalay_list = karyalay_lists(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:karyalay_lists)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create karyalay_list" do
    assert_difference('KaryalayList.count') do
      post :create, karyalay_list: {  }
    end

    assert_redirected_to karyalay_list_path(assigns(:karyalay_list))
  end

  test "should show karyalay_list" do
    get :show, id: @karyalay_list
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @karyalay_list
    assert_response :success
  end

  test "should update karyalay_list" do
    patch :update, id: @karyalay_list, karyalay_list: {  }
    assert_redirected_to karyalay_list_path(assigns(:karyalay_list))
  end

  test "should destroy karyalay_list" do
    assert_difference('KaryalayList.count', -1) do
      delete :destroy, id: @karyalay_list
    end

    assert_redirected_to karyalay_lists_path
  end
end
