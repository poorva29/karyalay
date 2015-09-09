
var app = angular.module('KaryalayApp');
  app.controller('karyalayListCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window) {

    var url_to_post = '/fetch_karyalay_info';
    $http.get(url_to_post)
      .success(function (response) {
        if(response){
          $scope.karyalayList = response;
        }else{

        }
    });
  });
