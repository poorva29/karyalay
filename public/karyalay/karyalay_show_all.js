var app = angular.module('KaryalayApp');
  app.controller('karyalayShowAll', function ($scope, $log, $http, Flash, Auth, $window, $ngBootbox, Lightbox) {

    $scope.openLightboxModal = function (index, karyalay_id) {
      var selected_karyalay = $scope.filter($scope.images, function(imageInfo) {
        if(imageInfo.id == karyalay_id)
          return imageInfo.karyalay_photos;
      });
      Lightbox.openModal($scope.first(selected_karyalay).karyalay_photos, index);
      Lightbox.keyboardNavEnabled = true;
    };

    var url_to_post = '/fetch_all_karyalay_list';
    $http.get(url_to_post)
      .success(function (response) {
        if(response){
          $scope.karyalayList = response;
          $scope.images = $scope.map(response, function(karyalayInfo) {
            return { id: karyalayInfo.karyalay.id, karyalay_photos: karyalayInfo.karyalay_photos };
          });
        }else{

        }
    });
  });
