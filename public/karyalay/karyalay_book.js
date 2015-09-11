var app = angular.module('KaryalayApp');
  app.controller('karyalayBookCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window, storeKaryalayInfo) {
    $scope.karyalay_lists_id = storeKaryalayInfo.getKaryalayInfo();
    $scope.animationsEnabled = true;

    $scope.slotSelected = function(start, end, jsEvent, view){
      $scope.open(start, end, jsEvent, view, 'lg');
    };

    $scope.open = function (start, end, jsEvent, view, size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'karyalayBooking.html',
        controller: 'BookKaryalayModalInstanceCtrl',
        size: size,
        backdrop: 'static',
        resolve: {
          items: function () {
            var items = {
              'start': start,
              'end': end,
              'jsEvent': jsEvent,
              'view': view,
              'karyalay_lists_id': $scope.karyalay_lists_id
            };
            return items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.uiConfig = {
      calendar:{
        firstDay: new Date().getDay(),
        defaultView: 'agendaWeek',
        height: 'auto',
        selectable: true,
        header:{
          left: 'agendaDay agendaWeek month',
          center: 'title',
          right: 'today prev,next'
        },
        views: {
          agendaWeek: {
            titleFormat: 'MMMM DD, YYYY',
          }
        },
        editable: true,
        timezone: 'local',
        select: $scope.slotSelected
      }
    };
    $scope.eventSources = [];
  });

  app.controller('BookKaryalayModalInstanceCtrl', function ($scope, $modalInstance, items, $http) {
    $scope.packageDetails = {
      selectedItem: [],
      selectedPeople: [],
      selectedCaterer: []
    };
    $scope.packageDetails.from_time = new Date();
    $scope.packageDetails.to_time = new Date();

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.status = {
      opened: false
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.today = function() {
      $scope.packageDetails.dt = new Date();
    };
    $scope.today();

    // Available categories for samagri
    $scope.karyalay_lists_id = items.karyalay_lists_id;
    $scope.category = {};
    $scope.categoryItems = [
      {id: 1, name: "birthday"},
      {id: 2, name: "marriage"},
      {id: 3, name: "function"},
      {id: 4, name: "pooja"},
      {id: 5, name: "others"},
    ];

    // Fetch Category wise samagri
    $scope.item = {};
    $scope.items = null;
    $scope.fetchTags = function(){
      $scope.category.hasSelected = true;
      var data = {category: $scope.category.selected.name};
      var url_to_post = '/fetch_selected_category';
      $http.get(url_to_post, {params: data})
        .success(function (response) {
          if(response){
            $scope.items = response;
            $scope.itemsSize = $scope.items.length;
          }else{

          }
      });
    };

    $scope.refreshTagNames = function(name){
      if($scope.items){
        $scope.items[$scope.itemsSize + 1] = {
          id: '-1',
          name: name,
          category: $scope.category.selected.name,
          quantity: $scope.quantity
        };
      }
    };

    $scope.quantity = 1;
    $scope.quantites = [1, 2, 3, 4, 5]

    $scope.updateQuantity = function(count){
      $scope.quantity = count;
    }

    $scope.selectItem = function(item, model){
      $scope.extend($scope.findWhere($scope.items, {id: item.id}), {quantity: $scope.quantity});
      $scope.extend(item, {quantity: $scope.quantity});
    }

    $scope.fetchKaryalayInfo = function() {
      var url_to_post = '/karyalay_lists/' + $scope.karyalay_lists_id + '/edit';
      $http.get(url_to_post)
        .success(function (response) {
          $scope.karyalayInfo = response.karyalay;
          $scope.karyalayAttrInfo = response.karyalay_attribute;
          $scope.panditList = response.karyalay_pandits;
          $scope.catererList = response.karyalay_caterers;
          $scope.karyalaySamagri = response.karyalay_samagris;
          if(response){
            // $scope.extend($scope.karyalayUpdateForm, $scope.karyalayInfo);
            // $scope.extend($scope.karyalayAttrUpdateForm, $scope.karyalayAttrInfo);
            // if($scope.karyalayAttrUpdateForm.has_samagri ||
            //    $scope.karyalayAttrUpdateForm.has_caterer ||
            //    $scope.karyalayAttrUpdateForm.has_pandit) {
            //      $scope.addPandit();
            //      $scope.addCaterer();
            // }
          }else{

          }
      });
    };

    $scope.fetchKaryalayInfo();

    $scope.ok = function () {
      console.log($scope.packageDetails);
      $modalInstance.close($scope.packageDetails);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });