var app = angular.module('KaryalayApp');
  app.controller('karyalayUpdateCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window, storeKaryalayInfo) {
    console.log(storeKaryalayInfo.getKaryalayInfo())
  });
