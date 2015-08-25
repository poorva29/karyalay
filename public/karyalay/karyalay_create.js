var app = angular.module('KaryalayApp', [ 'ui.bootstrap', 'ngAnimate', 'flash', 'ui.checkbox']);
  app.controller('karyalayCreateCtrl', function ($scope, $modal, $log, $http, Flash) {
    $scope.karyalayCreateForm = {};
    $scope.karyalayAttrCreateForm = {};
    $scope.saveStatus = {
      saveKaryalay: false,
      saveKaryalayAttr: false
    }
    $scope.oneAtATime = true;
    $scope.status = {
      openKaryalay: true,
      openKaryalayAttr: false
    };

    $scope.createSuccess = function () {
      var message = '<strong>Data Saved!</strong> Please proceded to create other attributes.';
      Flash.create('success', message);
    };

    $scope.createFailure = function () {
      var message = '<strong>Data NOT Created!</strong> Please try again.';
      Flash.create('danger', message);
    };

    $scope.createKaryalay = function(){
      response = true;
      // var data = {karyalay_list: $scope.karyalayCreateForm};
      // var url_to_post = '/karyalay_lists';
      // $http.post(url_to_post, data)
      //   .success(function (response) {
          if(response){
            // $scope.karyalayAttrCreateForm.karyalay_lists_id = response.id;
            $scope.karyalayAttrCreateForm.karyalay_lists_id = 4;
            $scope.createSuccess();
            $scope.saveStatus.saveKaryalay = true;
            $scope.status.openKaryalayAttr = true;
          }else{
            $scope.createFailure();
          }
      // });
    };

    $scope.createKaryalayAttr = function(){
      response = true;
      var data = {karyalay_attr_list: $scope.karyalayAttrCreateForm};
      var url_to_post = '/karyalay_attributes';
      $http.post(url_to_post, data)
        .success(function (response) {
          if(response){
            $scope.createSuccess();
            $scope.saveStatus.saveKaryalayAttr = true;
          }else{
            $scope.createFailure();
          }
      });
    };

  });