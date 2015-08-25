require 'test_helper'

class KaryalayAttributesControllerTest < ActionController::TestCase
  setup do
    @karyalay_attribute = karyalay_attributes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:karyalay_attributes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create karyalay_attribute" do
    assert_difference('KaryalayAttribute.count') do
      post :create, karyalay_attribute: {  }
    end

    assert_redirected_to karyalay_attribute_path(assigns(:karyalay_attribute))
  end

  test "should show karyalay_attribute" do
    get :show, id: @karyalay_attribute
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @karyalay_attribute
    assert_response :success
  end

  test "should update karyalay_attribute" do
    patch :update, id: @karyalay_attribute, karyalay_attribute: {  }
    assert_redirected_to karyalay_attribute_path(assigns(:karyalay_attribute))
  end

  test "should destroy karyalay_attribute" do
    assert_difference('KaryalayAttribute.count', -1) do
      delete :destroy, id: @karyalay_attribute
    end

    assert_redirected_to karyalay_attributes_path
  end
end
