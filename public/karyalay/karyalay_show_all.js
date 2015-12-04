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

    $scope.fetchAllKaryalayList = function(data) {
      var url_to_get = '/matching_karyalay_list';
      var search_params = {};
      $http.get(url_to_get, {params: {search_by: $scope.isEmpty(data) ? '' : data}})
        .success(function (response) {
          if(response){
            $scope.karyalayList = response;
            $scope.images = $scope.map(response, function(karyalayInfo) {
              return { id: karyalayInfo.karyalay.id, karyalay_photos: karyalayInfo.karyalay_photos };
            });
          }else{

          }
      });
    };
    $scope.fetchAllKaryalayList({});

    $scope.fetchKaryalayResult = function(){
      var data = {}
      $scope.each($scope.karyalayAttrCreateForm, function(value , key){
        if(value == true){
          var obj = {} ;
          obj[key]=value;
          $scope.extend(data, obj);
        }
      });
      if(!$scope.isEmpty(data)) {
        $scope.fetchAllKaryalayList(data);
      }
    };
  });
