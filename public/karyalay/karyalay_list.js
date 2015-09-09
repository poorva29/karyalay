var app = angular.module('KaryalayApp');
  app.controller('karyalayListCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window, storeKaryalayInfo) {

    $scope.deleteSuccess = function () {
      var message = '<strong>Karyalay Deleted!</strong> karyalay related other attributes are removed.';
      Flash.create('success', message);
    };

    $scope.deleteFailure = function () {
      var message = '<strong>Karyalay Not Deleted!</strong> something went wrong.';
      Flash.create('danger', message);
    };

    var url_to_post = '/fetch_karyalay_info';
    $http.get(url_to_post)
      .success(function (response) {
        if(response){
          $scope.karyalayList = response;
        }else{

        }
    });

    $scope.editKaryalay = function(karyalay_id) {
      storeKaryalayInfo.setKaryalayInfo(karyalay_id);
    };

    $scope.deleteKaryalay = function(karyalay_id) {
      $scope.karyalayList = $scope.filter($scope.karyalayList, function(karyalayInfo) {
        return karyalayInfo.karyalay.id !== karyalay_id
      });
      url_delete = '/karyalay_lists/';
      $http.delete(url_delete + karyalay_id)
        .success(function (response) {
          if(response.status){
            $scope.deleteSuccess();
          }else{
            $scope.deleteFailure();
          };
      });
    }
  });
