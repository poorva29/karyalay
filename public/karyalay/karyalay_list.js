var app = angular.module('KaryalayApp');
  app.controller('karyalayListCtrl', function ($scope, $log, $http, Flash, Auth, $window, storeKaryalayInfo, $ngBootbox) {
    $scope.sortType     = ''; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchKaryalay   = {};     // set the default search/filter term

    $scope.deleteSuccess = function () {
      var message = '<strong>Karyalay Deleted!</strong> karyalay related other attributes are removed.';
      Flash.create('success', message);
    };

    $scope.deleteFailure = function () {
      var message = '<strong>Karyalay Not Deleted!</strong> something went wrong.';
      Flash.create('danger', message);
    };

    var url_to_post = '/fetch_karyalay_list';
    $http.get(url_to_post)
      .success(function (response) {
        if(response){
          $scope.karyalayList = response;
        }else{

        }
    });

    $scope.setKaryalayId = function(karyalay_id) {
      storeKaryalayInfo.setKaryalayInfo(karyalay_id);
    };

    $scope.deleteKaryalay = function(karyalay_id) {
      var options = {
      message: 'Are you sure Karyalay is to be deleted ?',
      title: 'Delete Karyalay',
      className: 'test-class',
      buttons: {
        success: {
          label: "Yes",
          className: "btn-success",
          callback: function() {
            $scope.karyalayList = $scope.reject($scope.karyalayList, {id: karyalay_id});
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
        }
      }
    };
    $ngBootbox.customDialog(options);
    }
  });
