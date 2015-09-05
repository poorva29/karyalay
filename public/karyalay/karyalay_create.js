var app = angular.module('KaryalayApp', [ 'ui.bootstrap', 'ngAnimate', 'flash', 'ui.checkbox', 'angular-underscore',
                                          'ui.select', 'ngSanitize', 'ng.bs.dropdown']);
  app.filter('propsFilter', function() {
    return function(items, props) {
      var out = [];
      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;
          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }
          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }
      return out;
    };
  });

  app.controller('karyalayCreateCtrl', function ($scope, $modal, $log, $http, Flash) {
    $scope.selectPanditDetails = {
      subitems: []
    };
    $scope.selectCatererDetails = {
      subitems: []
    };
    $scope.templates = [];
    $scope.karyalayCreateForm = {};
    $scope.karyalayAttrCreateForm = {};
    $scope.saveStatus = {
      saveKaryalay: false,
      saveKaryalayAttr: false,
      saveKaryalayDependents: false
    }
    $scope.oneAtATime = true;
    $scope.status = {
      openKaryalay: true,
      openKaryalayAttr: false,
      openKaryalayDependents: false
    };

    $scope.showNewPandit = true;
    $scope.showNewCaterer = true;

    $scope.availableSpecialites = [
      'Maharashtrian', 'South Indian', 'Chineese'
    ]

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

    // Fetch Pandits
    $scope.person = {};
    $scope.panditList = [];
    $scope.fetchPandits = function(){
      var url_to_get = '/karyalay_pandits';
      $http.get(url_to_get)
        .success(function (response) {
          if(response){
            $scope.panditList = response;
          }else{
            // do something
          }
      });
    };
    $scope.fetchPandits();

    // Fetch Caterer
    $scope.catererSel = {};
    $scope.catererList = [];
    $scope.fetchCaterers = function(){
      var url_to_get = '/karyalay_caterers';
      $http.get(url_to_get)
        .success(function (response) {
          if(response){
            $scope.catererList = response;
          }else{
            // do something
          }
      });
    };
    $scope.fetchCaterers();

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

    $scope.multipleItmes = {
      selectedItem: [],
      selectedPeople: [],
      selectedCaterer: []
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

    $scope.createSuccess = function () {
      var message = '<strong>Data Saved!</strong> Please proceded to create other attributes.';
      Flash.create('success', message);
    };

    $scope.createFailure = function () {
      var message = '<strong>Data NOT Created!</strong> Please try again.';
      Flash.create('danger', message);
    };

    $scope.createKaryalay = function(){
      response = {id: 5};
      var data = {karyalay_list: $scope.karyalayCreateForm};
      var url_to_post = '/karyalay_lists';
      $http.post(url_to_post, data)
        .success(function (response) {
          if(response){
            $scope.karyalay_lists_id = response.id;
            $scope.karyalayAttrCreateForm.karyalay_lists_id = $scope.karyalay_lists_id;
            $scope.createSuccess();
            $scope.saveStatus.saveKaryalay = true;
            $scope.status.openKaryalayAttr = true;
          }else{
            $scope.createFailure();
          }
      });
    };

    $scope.createKaryalayAttr = function(){
      response = true;
      var data = {karyalay_attr_list: $scope.karyalayAttrCreateForm};
      var url_to_post = '/karyalay_attributes';
      $http.post(url_to_post, data)
        .success(function (response) {
          if(response){
            $scope.karyalayAttrCreateForm.karyalay_attr_id = response.id;
            $scope.createSuccess();
            $scope.saveStatus.saveKaryalayAttr = true;
            $scope.status.openKaryalayDependents = true;
            $scope.addPandit();
            $scope.addCaterer();
          }else{
            $scope.createFailure();
          }
      });
    };

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

    $scope.createKaryalayDependency = function(){

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
              $scope.createSuccess();
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
              $scope.createSuccess();
            }else{
              $scope.createFailure();
            }
        });
      });

      //add samagri
      var data = {karyalay_samagri_params: {selected_item: $scope.multipleItmes.selectedItem, karyalay_lists_id: $scope.karyalay_lists_id}};
      var url_to_post = '/create_add_tag';
      $http.post(url_to_post, data)
        .success(function (response) {
          if(response){
            $scope.createSuccess();
          }else{
            $scope.createFailure();
          }
      });
    };
  });

  app.directive('subPanditItemPartial', function(){
    return {
      restrict: "E",
      templateUrl: "addPandit.html"
    };
  });

  app.directive('subCatererItemPartial', function(){
    return {
      restrict: "E",
      templateUrl: "addCaterer.html"
    };
  });
