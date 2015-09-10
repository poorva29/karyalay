var app = angular.module('KaryalayApp');
  app.controller('karyalayUpdateCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window, storeKaryalayInfo, $q) {
    $scope.karyalay_lists_id = storeKaryalayInfo.getKaryalayInfo();
    $scope.oneAtATime = true;
    $scope.karyalayUpdateForm = {};
    $scope.karyalayAttrUpdateForm = {};
    $scope.status = {
      openKaryalay: true,
      openKaryalayAttr: false,
      openKaryalayDependents: false
    };

    $scope.multipleItmes = {
      selectedItem: [],
      selectedPeople: [],
      selectedCaterer: []
    };

    // Fetch Pandits
    $scope.person = {};
    $scope.panditList = [];
    $scope.fetchPandits = function(){
      var url_to_get = '/karyalay_pandits';
      var promise = $http.get(url_to_get)
        .success(function (response) {
          if(response){
            $scope.panditList = response;
          }else{
            // do something
          }
      });
      return promise;
    };
    $scope.promise1 = $scope.fetchPandits();

    // Fetch Caterer
    $scope.catererSel = {};
    $scope.catererList = [];
    $scope.fetchCaterers = function(){
      var url_to_get = '/karyalay_caterers';
      var promise = $http.get(url_to_get)
        .success(function (response) {
          if(response){
            $scope.catererList = response;
          }else{
            // do something
          }
      });
      return promise;
    };
    $scope.promise2 = $scope.fetchCaterers();
    $scope.availableSpecialites = [
      'Maharashtrian', 'South Indian', 'Chineese'
    ]

    // Available categories for samagri
    $scope.category = {};
    $scope.categoryItems = [
      {id: 1, name: "birthday"},
      {id: 2, name: "marriage"},
      {id: 3, name: "function"},
      {id: 4, name: "pooja"},
      {id: 5, name: "others"},
    ];
    $scope.quantity = 1;
    $scope.quantites = [1, 2, 3, 4, 5]

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

    $scope.updateQuantity = function(count){
      $scope.quantity = count;
    }

    $scope.selectItem = function(item, model){
      $scope.extend($scope.findWhere($scope.items, {id: item.id}), {quantity: $scope.quantity});
      $scope.extend(item, {quantity: $scope.quantity});
    }

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

    // For adding/removing and new/existing , pandit/caterer

    $scope.selectPanditDetails = {
      subitems: []
    };
    $scope.selectCatererDetails = {
      subitems: []
    };
    $scope.templates = [];

    $scope.showNewPandit = true;
    $scope.showNewCaterer = true;


    $scope.addPandit = function(){
      $scope.selectPanditDetails.subitems.push({});
    };

    $scope.addCaterer = function(){
      $scope.selectCatererDetails.subitems.push({});
    };

    $scope.removePandit = function(index){
      $scope.selectPanditDetails.subitems.splice(index, 1);
    };

    $scope.removeCaterer = function(index){
      $scope.selectCatererDetails.subitems.splice(index, 1);
    };

    $scope.changePanditType = function(){
      $scope.showNewPandit = !$scope.showNewPandit;
    };

    $scope.changeCatererType = function(){
      $scope.showNewCaterer = !$scope.showNewCaterer;
    }

    $scope.updateSuccess = function(){
      var message = '<strong>Data Saved!</strong> Update other attributes if required.';
      Flash.create('success', message);
    };

    $scope.fetchKaryalayInfo = function() {
      var url_to_post = '/karyalay_lists/' + $scope.karyalay_lists_id + '/edit';
      var promise = $http.get(url_to_post)
        .success(function (response) {
          $scope.karyalayInfo = response.karyalay;
          $scope.karyalayAttrInfo = response.karyalay_attribute;
          $scope.karyalayPandit = response.karyalay_pandits;
          $scope.karyalayCaterer = response.karyalay_caterers;
          $scope.karyalaySamagri = response.karyalay_samagris;
          if(response){
            $scope.extend($scope.karyalayUpdateForm, $scope.karyalayInfo);
            $scope.extend($scope.karyalayAttrUpdateForm, $scope.karyalayAttrInfo);
            if($scope.karyalayAttrUpdateForm.has_samagri ||
               $scope.karyalayAttrUpdateForm.has_caterer ||
               $scope.karyalayAttrUpdateForm.has_pandit) {
                 $scope.addPandit();
                 $scope.addCaterer();
            }
          }else{

          }
      });
      return promise
    };

    $scope.promise3 = $scope.fetchKaryalayInfo();

    $q.all([$scope.promise1, $scope.promise3])
      .then(function(results) {
        var pandits = $scope.map($scope.karyalayPandit, function(pandit){
          if($scope.findIndex($scope.panditList, {id: pandit.id})) {
           return pandit }
         });
        $scope.multipleItmes.selectedPeople = pandits;
      });

    $q.all([$scope.promise2, $scope.promise3])
      .then(function(results) {
        var caterers = $scope.map($scope.karyalayCaterer, function(caterer){
          if($scope.findIndex($scope.catererList, {id: caterer.id})) {
           return caterer }
         });
        $scope.multipleItmes.selectedCaterer = caterers;
      });

    $scope.updateKaryalay = function() {
      var data = {karyalay_list: $scope.karyalayUpdateForm};
      var url_to_post = '/karyalay_lists/';
      $http.put(url_to_post + $scope.karyalay_lists_id, data)
        .success(function (response) {
          if(response){
            $scope.updateSuccess();
          }else{
            $scope.createFailure();
          }
      });
    };

    $scope.updateKaryalayAttr = function() {
      var data = {karyalay_attr_list: $scope.karyalayAttrUpdateForm};
      if($scope.karyalayAttrInfo) {
        var url_to_post = '/karyalay_attributes/';
        $http.put(url_to_post + $scope.karyalayAttrInfo.id, data)
          .success(function (response) {
            if(response){
              $scope.updateSuccess();
            }else{
              $scope.createFailure();
            }
        });
      }else{
        var url_to_post = '/karyalay_attributes';
        $scope.extend(data.karyalay_attr_list, {karyalay_lists_id: $scope.karyalay_lists_id});
        $http.post(url_to_post, data)
          .success(function (response) {
            if(response){
              if($scope.karyalayAttrUpdateForm.has_samagri ||
                 $scope.karyalayAttrUpdateForm.has_caterer ||
                 $scope.karyalayAttrUpdateForm.has_pandit) {
                   $scope.updateSuccess();
                   $scope.addPandit();
                   $scope.addCaterer();
              }else{
                // $location.url('/');
              }
            }else{
              $scope.updateFailure();
            }
        });
      }
    };

    $scope.updateKaryalayDependency = function() {
      // add pandit
      var merged_pandits = $scope.union($scope.selectPanditDetails.subitems, $scope.multipleItmes.selectedPeople);
      merged_pandits = $scope.reject(merged_pandits, function(x){ return $scope.isEmpty(x)});
      merged_pandits = $scope.map(merged_pandits, function(o) {
        return $scope.omit(o, 'created_at', 'updated_at', '$$hashKey');
      });
      $scope.each(merged_pandits, function(pandit){
        var data = {karyalay_pandit_params: $scope.extend(pandit, {karyalay_lists_id: $scope.karyalay_lists_id})};
        var url_to_post = '/karyalay_pandits';
        $http.post(url_to_post, data)
          .success(function (response) {
            if(response){
              $scope.updateSuccess();
            }else{
              $scope.createFailure();
            }
        });
      });

      //add caterer
      var merged_caterers = $scope.union($scope.selectCatererDetails.subitems, $scope.multipleItmes.selectedCaterer);
      merged_caterers = $scope.reject(merged_caterers, function(x){ return $scope.isEmpty(x)});
      merged_caterers = $scope.map(merged_caterers, function(o) {
        return $scope.omit(o, 'created_at', 'updated_at', '$$hashKey');
      });
      $scope.each(merged_caterers, function(caterer){
        var data = {karyalay_caterer_params: $scope.extend(caterer, {karyalay_lists_id: $scope.karyalay_lists_id})};
        var url_to_post = '/karyalay_caterers';
        $http.post(url_to_post, data)
          .success(function (response) {
            if(response){
              $scope.updateSuccess();
            }else{
              $scope.createFailure();
            }
        });
      });
    };
  });
