angular.module('KaryalayApp').controller('RemoveDependencyCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;

  $scope.ok = function () {
    $modalInstance.close($scope.items.type);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});