require 'test_helper'

class KaryalayPackagesControllerTest < ActionController::TestCase
  setup do
    @karyalay_package = karyalay_packages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:karyalay_packages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create karyalay_package" do
    assert_difference('KaryalayPackage.count') do
      post :create, karyalay_package: {  }
    end

    assert_redirected_to karyalay_package_path(assigns(:karyalay_package))
  end

  test "should show karyalay_package" do
    get :show, id: @karyalay_package
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @karyalay_package
    assert_response :success
  end

  test "should update karyalay_package" do
    patch :update, id: @karyalay_package, karyalay_package: {  }
    assert_redirected_to karyalay_package_path(assigns(:karyalay_package))
  end

  test "should destroy karyalay_package" do
    assert_difference('KaryalayPackage.count', -1) do
      delete :destroy, id: @karyalay_package
    end

    assert_redirected_to karyalay_packages_path
  end
end
