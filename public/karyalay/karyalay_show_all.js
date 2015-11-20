var app = angular.module('KaryalayApp');
  app.controller('karyalayShowAll', function ($scope, $modal, $log, $http, Flash, Auth, $window, $ngBootbox) {
    var url_to_post = '/fetch_all_karyalay_list';
    $http.get(url_to_post)
      .success(function (response) {
        if(response){
          $scope.karyalayList = response;
        }else{

        }
    });
  });
