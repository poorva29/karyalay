app.controller('BookKaryalayModalInstanceCtrl', function ($scope, $modalInstance, items, $http) {
  $scope.packageDetails = {
    selectedItem: [],
    selectedPeople: [],
    selectedCaterer: []
  };

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

  $scope.selectedSlot = function() {
    var from_date = items.start;
    var from_time = items.start;
    var to_time = items.end;
    $scope.packageDetails.from_date = from_date.toDate();
    $scope.packageDetails.from_time = from_time.toDate();
    $scope.packageDetails.to_time = to_time.toDate();
  };
  $scope.selectedSlot();

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
    var url_to_get = '/fetch_selected_category';
    $http.get(url_to_get, {params: data})
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
    var url_to_get = '/karyalay_lists/' + $scope.karyalay_lists_id + '/edit';
    $http.get(url_to_get)
      .success(function (response) {
        $scope.karyalayInfo = response.karyalay;
        $scope.karyalayAttrInfo = response.karyalay_attribute;
        $scope.panditList = response.karyalay_pandits;
        $scope.catererList = response.karyalay_caterers;
        $scope.karyalaySamagri = response.karyalay_samagris;
    });
  };

  $scope.fetchKaryalayInfo();

  $scope.ok = function () {
    $modalInstance.close($scope.packageDetails);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

app.controller('BookEditKaryalayModalInstanceCtrl', function ($scope, $modalInstance, items, $http, $q) {
  $scope.isEdit = true;
  $scope.packageDetails = {
    selectedItem: [],
    selectedPeople: [],
    selectedCaterer: []
  };

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

  $scope.selectedSlot = function() {
    var from_date = items.event.start;
    var from_time = items.event.start;
    var to_time = items.event.end;
    $scope.packageDetails.from_date = from_date.toDate();
    $scope.packageDetails.from_time = from_time.toDate();
    $scope.packageDetails.to_time = to_time.toDate();
  };
  $scope.selectedSlot();

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
    var url_to_get = '/fetch_selected_category';
    $http.get(url_to_get, {params: data})
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
    var url_to_get = '/karyalay_lists/' + $scope.karyalay_lists_id + '/edit';
    var promise = $http.get(url_to_get)
      .success(function (response) {
        $scope.karyalayInfo = response.karyalay;
        $scope.karyalayAttrInfo = response.karyalay_attribute;
        $scope.panditList = response.karyalay_pandits;
        $scope.catererList = response.karyalay_caterers;
        $scope.karyalaySamagri = response.karyalay_samagris;
      });
    return promise;
  };
  $scope.promise1 = $scope.fetchKaryalayInfo();

  $scope.fetchKaryalayPackage = function() {
    var url_to_get = '/karyalay_packages/' + items.event.id + '/edit';
    var promise = $http.get(url_to_get)
      .success(function (response) {
        $scope.extend($scope.packageDetails, $scope.omit(response.karyalay_package, 'from_date', 'from_time' ,'to_time'));
        $scope.karyalay_pandits = response.karyalay_pandits;
        $scope.karyalay_caterers = response.karyalay_caterers;
      });
    return promise;
  };
  $scope.promise2 = $scope.fetchKaryalayPackage();

  $q.all([$scope.promise1, $scope.promise2])
    .then(function(results) {
      var pandits = $scope.map($scope.karyalay_pandits, function(pandit){
        if($scope.findWhere($scope.panditList, {id: pandit.id})) {
         return pandit }
       });
      $scope.packageDetails.selectedPeople = $scope.compact(pandits);

      var caterers = $scope.map($scope.karyalay_caterers, function(caterer){
        if($scope.findWhere($scope.catererList, {id: caterer.id})) {
         return caterer }
       });
      $scope.packageDetails.selectedCaterer = $scope.compact(caterers);
    });

  $scope.ok = function () {
    $modalInstance.close($scope.packageDetails);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});