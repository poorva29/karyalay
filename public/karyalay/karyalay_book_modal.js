app.controller('BookKaryalayModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http) {
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
    $scope.packageDetails.all_day = items.start.hasTime() && items.end.hasTime() ? false : true;
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
    var data = {category: $scope.category.selected.name, karyalay_lists_id: $scope.karyalay_lists_id};
    var url_to_get = '/fetch_pselected_category';
    $http.get(url_to_get, {params: data})
      .success(function (response) {
        if(response){
          $scope.items = response;
          $scope.itemsSize = $scope.items.length;
          $scope.packageDetails.selectedItem = [];
        }else{

        }
    });
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
    $uibModalInstance.close($scope.packageDetails);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('BookEditKaryalayModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $q, $ngBootbox) {
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
    var from_date = items.event.start,
    from_time = items.event.start,
    end_time = items.event.end,
    to_time = end_time;
    if(!end_time)
      to_time = new moment(from_time);
    $scope.packageDetails.all_day = items.event.start.hasTime() && end_time && end_time.hasTime() ? false : true;
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

  $scope.remove_matching_samagri = function(samagri_list){
    var samagri_list_id = $scope.map($scope.packageDetails.selectedItem, function(samagri){
      return $scope.property('id')(samagri)
    });
    return $scope.reject(samagri_list, function(samagri) {
      return $scope.contains(samagri_list_id, samagri.id);
    });
  };

  $scope.fetchTags = function(){
    $scope.category.hasSelected = true;
    var data = {category: $scope.category.selected.name, karyalay_lists_id: $scope.karyalay_lists_id};
    var url_to_get = '/fetch_pselected_category';
    $http.get(url_to_get, {params: data})
      .success(function (response) {
        if(response){
          var items = $scope.packageDetails.selectedItem;
          if(!$scope.isEmpty(items) && !(items[0].category == $scope.category.selected.name))
            $scope.packageDetails.selectedItem = [];
          $scope.items = $scope.remove_matching_samagri(response);
          $scope.itemsSize = $scope.items.length;
        }else{

        }
    });
  };

  $scope.quantity = 1;
  $scope.quantites = [1, 2, 3, 4, 5]

  $scope.updateQuantity = function(count){
    $scope.quantity = count;
  };

  $scope.selectItem = function(item, model){
    $scope.extend($scope.findWhere($scope.items, {id: item.id}), {quantity: $scope.quantity});
    $scope.extend(item, {quantity: $scope.quantity});
  };

  $scope.removeItem = function(item, model) {
    if($scope.category.selected && ($scope.category.selected.name == item.category)){
      if($scope.isEmpty($scope.where($scope.items, {'id':item.id})))
        $scope.items.push(item);
    }
  };

  $scope.removeCaterer = function(item, model) {
    if($scope.isEmpty($scope.where($scope.catererList, {'id':item.id})))
      $scope.catererList.push(item);
  };

  $scope.removePandit = function(item, model) {
    if($scope.isEmpty($scope.where($scope.panditList, {'id':item.id})))
      $scope.panditList.push(item);
  };

  $scope.fetchKaryalayInfo = function() {
    var url_to_get = '/karyalay_lists/' + $scope.karyalay_lists_id + '/edit';
    var promise = $http.get(url_to_get)
      .success(function (response) {
        $scope.karyalayInfo = response.karyalay;
        $scope.karyalayAttrInfo = response.karyalay_attribute;
        $scope.panditList = response.karyalay_pandits;
        $scope.catererList = response.karyalay_caterers;
        $scope.karyalay_samagris = response.karyalay_samagris;
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
        $scope.items = response.karyalay_samagris
      });
    return promise;
  };
  $scope.promise2 = $scope.fetchKaryalayPackage();

  $q.all([$scope.promise1, $scope.promise2])
    .then(function(results) {
      var pandits = $scope.map($scope.karyalay_pandits, function(pandit) {
        if($scope.findWhere($scope.panditList, {id: pandit.id})) {
          $scope.panditList = $scope.without($scope.panditList, $scope.findWhere($scope.panditList, {id: pandit.id}));
         return pandit }
       });
      $scope.packageDetails.selectedPeople = $scope.compact(pandits);

      var caterers = $scope.map($scope.karyalay_caterers, function(caterer) {
        if($scope.findWhere($scope.catererList, {id: caterer.id})) {
          $scope.catererList = $scope.without($scope.catererList, $scope.findWhere($scope.catererList, {id: caterer.id}));
         return caterer }
       });
      $scope.packageDetails.selectedCaterer = $scope.compact(caterers);

      var samagris = $scope.map($scope.items, function(samagri) {
        if($scope.findWhere($scope.karyalay_samagris, {id: samagri.id})) {
          return samagri }
      });
      if(samagris.length > 0) {
        $scope.packageDetails.selectedItem = samagris;
        $scope.category.hasSelected = true;
        $scope.category.selected = $scope.where($scope.categoryItems, {name: samagris[0].category})[0];
        $scope.fetchTags();
      }

    });

  $scope.delete = function(){
    var options = {
      message: 'Are you sure package is to be deleted ?',
      title: 'Delete Package',
      className: 'test-class',
      buttons: {
        success: {
          label: "Yes",
          className: "btn-success",
          callback: function() {
            $uibModalInstance.close('delete');
          }
        }
      }
    };
    $ngBootbox.customDialog(options);
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.packageDetails);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.setAllDay = function () {
    console.log($scope.packageDetails.all_day);
    if(!$scope.packageDetails.all_day) {
      $scope.packageDetails.from_time = new moment($scope.packageDetails.from_time).add(1, 'h').toDate();
      $scope.packageDetails.from_date = new moment($scope.packageDetails.from_time).add(0, 'h').toDate();
      $scope.packageDetails.to_time = new moment($scope.packageDetails.from_time).add(3, 'h').toDate();
      $scope.packageDetails.to_date = new moment($scope.packageDetails.from_time).add(3, 'h').toDate();
    }
  };
});

app.controller('BookPastKaryalayModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $q, $ngBootbox) {
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
    var end_time = items.event.end,
    from_date = items.event.start,
    from_time = items.event.start,
    to_time = end_time;
    if(!end_time)
      to_time = new moment(from_time);
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

  $scope.remove_matching_samagri = function(samagri_list){
    var samagri_list_id = $scope.map($scope.packageDetails.selectedItem, function(samagri){
      return $scope.property('id')(samagri)
    });
    return $scope.reject(samagri_list, function(samagri) {
      return $scope.contains(samagri_list_id, samagri.id);
    });
  };

  $scope.fetchTags = function(){
    $scope.category.hasSelected = true;
    var data = {category: $scope.category.selected.name, karyalay_lists_id: $scope.karyalay_lists_id};
    var url_to_get = '/fetch_pselected_category';
    $http.get(url_to_get, {params: data})
      .success(function (response) {
        if(response){
          var items = $scope.packageDetails.selectedItem;
          if(!$scope.isEmpty(items) && !(items[0].category == $scope.category.selected.name))
            $scope.packageDetails.selectedItem = [];
          $scope.items = $scope.remove_matching_samagri(response);
          $scope.itemsSize = $scope.items.length;
        }else{

        }
    });
  };

  $scope.quantity = 1;
  $scope.quantites = [1, 2, 3, 4, 5]

  $scope.updateQuantity = function(count){
    $scope.quantity = count;
  };

  $scope.selectItem = function(item, model){
    $scope.extend($scope.findWhere($scope.items, {id: item.id}), {quantity: $scope.quantity});
    $scope.extend(item, {quantity: $scope.quantity});
  };

  $scope.removeItem = function(item, model) {
    if($scope.category.selected && ($scope.category.selected.name == item.category)){
      if($scope.isEmpty($scope.where($scope.items, {'id':item.id})))
        $scope.items.push(item);
    }
  };

  $scope.removeCaterer = function(item, model) {
    if($scope.isEmpty($scope.where($scope.catererList, {'id':item.id})))
      $scope.catererList.push(item);
  };

  $scope.removePandit = function(item, model) {
    if($scope.isEmpty($scope.where($scope.panditList, {'id':item.id})))
      $scope.panditList.push(item);
  };

  $scope.fetchKaryalayInfo = function() {
    var url_to_get = '/karyalay_lists/' + $scope.karyalay_lists_id + '/edit';
    var promise = $http.get(url_to_get)
      .success(function (response) {
        $scope.karyalayInfo = response.karyalay;
        $scope.karyalayAttrInfo = response.karyalay_attribute;
        $scope.panditList = response.karyalay_pandits;
        $scope.catererList = response.karyalay_caterers;
        $scope.karyalay_samagris = response.karyalay_samagris;
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
        $scope.items = response.karyalay_samagris
      });
    return promise;
  };
  $scope.promise2 = $scope.fetchKaryalayPackage();

  $q.all([$scope.promise1, $scope.promise2])
    .then(function(results) {
      var pandits = $scope.map($scope.karyalay_pandits, function(pandit) {
        if($scope.findWhere($scope.panditList, {id: pandit.id})) {
          $scope.panditList = $scope.without($scope.panditList, $scope.findWhere($scope.panditList, {id: pandit.id}));
         return pandit }
       });
      $scope.packageDetails.selectedPeople = $scope.compact(pandits);

      var caterers = $scope.map($scope.karyalay_caterers, function(caterer) {
        if($scope.findWhere($scope.catererList, {id: caterer.id})) {
          $scope.catererList = $scope.without($scope.catererList, $scope.findWhere($scope.catererList, {id: caterer.id}));
         return caterer }
       });
      $scope.packageDetails.selectedCaterer = $scope.compact(caterers);

      var samagris = $scope.map($scope.items, function(samagri) {
        if($scope.findWhere($scope.karyalay_samagris, {id: samagri.id})) {
          return samagri }
      });
      if(samagris.length > 0) {
        $scope.packageDetails.selectedItem = samagris;
        $scope.category.hasSelected = true;
        $scope.category.selected = $scope.where($scope.categoryItems, {name: samagris[0].category})[0];
        $scope.fetchTags();
      }

    });

  $scope.delete = function(){
    var options = {
      message: 'Are you sure package is to be deleted ?',
      title: 'Delete Package',
      className: 'test-class',
      buttons: {
        success: {
          label: "Yes",
          className: "btn-success",
          callback: function() {
            $uibModalInstance.close('delete');
          }
        }
      }
    };
    $ngBootbox.customDialog(options);
  };

  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };
});