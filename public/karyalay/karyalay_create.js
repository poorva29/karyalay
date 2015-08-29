var app = angular.module('KaryalayApp', [ 'ui.bootstrap', 'ngAnimate', 'flash', 'ui.checkbox', 'angular-underscore']);
  app.controller('karyalayCreateCtrl', function ($scope, $modal, $log, $http, Flash) {
    $scope.selectPanditDetails = {
      subitems: []
    };
    $scope.selectCatererDetails = {
      subitems: []
    };
    $scope.templates = [];
    $scope.karyalayCreateForm = {};
    $scope.karyalayAttrCreateForm = {};
    $scope.saveStatus = {
      saveKaryalay: false,
      saveKaryalayAttr: false,
      saveKaryalayDependents: false
    }
    $scope.oneAtATime = true;
    $scope.status = {
      openKaryalay: true,
      openKaryalayAttr: false,
      openKaryalayDependents: false
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
      response = {id: 5};
      // var data = {karyalay_list: $scope.karyalayCreateForm};
      // var url_to_post = '/karyalay_lists';
      // $http.post(url_to_post, data)
      //   .success(function (response) {
          if(response){
            $scope.karyalay_lists_id = response.id;
            $scope.karyalayAttrCreateForm.karyalay_lists_id = $scope.karyalay_lists_id;
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
      // var data = {karyalay_attr_list: $scope.karyalayAttrCreateForm};
      // var url_to_post = '/karyalay_attributes';
      // $http.post(url_to_post, data)
      //   .success(function (response) {
          if(response){
            $scope.karyalayAttrCreateForm.karyalay_attr_id = response.id;
            $scope.createSuccess();
            $scope.saveStatus.saveKaryalayAttr = true;
            $scope.status.openKaryalayDependents = true;
            $scope.addPandit();
            $scope.addCaterer();
          }else{
            $scope.createFailure();
          }
      // });
    };

    $scope.addPandit = function(){
      $scope.selectPanditDetails.subitems.push({});
    };

    $scope.addCaterer = function(){
      $scope.selectCatererDetails.subitems.push({});
    };

    $scope.removePandit = function(index){
      $scope.selectPanditDetails.subitems.splice(index, 1);
    };

    $scope.removeCaterer = function(index){
      $scope.selectCatererDetails.subitems.splice(index, 1);
    };

    $scope.createKaryalayDependency = function(){

      // add pandit
      // $scope.each($scope.selectPanditDetails.subitems, function(pandit){
      //   var data = {karyalay_pandit_params: $scope.extend(pandit, {karyalay_lists_id: $scope.karyalay_lists_id})};
      //   var url_to_post = '/karyalay_pandits';
      //   $http.post(url_to_post, data)
      //     .success(function (response) {
      //       if(response){
      //         $scope.createSuccess();
      //       }else{
      //         $scope.createFailure();
      //       }
      //   });
      // });

      //add caterer
      $scope.each($scope.selectCatererDetails.subitems, function(caterer){
        var data = {karyalay_caterer_params: $scope.extend(caterer, {karyalay_lists_id: $scope.karyalay_lists_id})};
        var url_to_post = '/karyalay_caterers';
        $http.post(url_to_post, data)
          .success(function (response) {
            if(response){
              $scope.createSuccess();
            }else{
              $scope.createFailure();
            }
        });
      });
    };
  });

  app.directive('subPanditItemPartial', function(){
    return {
      restrict: "E",
      templateUrl: "addPandit.html"
    };
  });

  app.directive('subCatererItemPartial', function(){
    return {
      restrict: "E",
      templateUrl: "addCaterer.html"
    };
  });
