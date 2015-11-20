var app = angular.module('KaryalayApp');
  app.controller('karyalayUpdateCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window, storeKaryalayInfo, $q, Upload) {
    $scope.karyalay_lists_id = storeKaryalayInfo.getKaryalayInfo();
    $scope.oneAtATime = true;
    $scope.change_pandit = false;
    $scope.change_caterer = false;
    $scope.karyalayUpdateForm = {};
    $scope.karyalayAttrUpdateForm = {};
    $scope.karyalayAttrDepUpdateForm = {};
    $scope.karyalayGalleryUpdateForm = {};
    $scope.karyalayAttrInfo = {};
    $scope.radioAppointment = {};
    $scope.animationsEnabled = true;
    $scope.status = {
      openKaryalay: true,
      openKaryalayAttr: false,
      openKaryalayDependents: false,
      openKaryalayGallery: false
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

    $scope.samagriSel = {};
    $scope.samagriList = [];

    $scope.fetchSamagris = function(){
      var url_to_get = '/karyalay_samagris';
      var promise = $http.get(url_to_get)
        .success(function (response) {
          if(response){
            $scope.samagriList = response;
          }else{
            // do something
          }
      });
      return promise;
    };
    $scope.promise3 = $scope.fetchSamagris();

    $scope.refreshTagNames = function(name){
      if(!$scope.isEmpty($scope.items)){
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

    $scope.removeItem = function(item, model) {
      if($scope.category.selected && ($scope.category.selected.name == item.category)){
        if($scope.isEmpty($scope.where($scope.items, {'id':item.id})))
          $scope.items.push(item);
      }
    }

    // Fetch Category wise samagri

    $scope.remove_matching_samagri = function(samagri_list){
      var samagri_list_id = $scope.map($scope.multipleItmes.selectedItem, function(samagri){
        return $scope.property('id')(samagri)
      });
      return $scope.reject(samagri_list, function(samagri) {
        return $scope.contains(samagri_list_id, samagri.id);
      });
    };

    $scope.item = {};
    $scope.items = null;
    $scope.fetchTags = function(){
      if(!$scope.isEmpty($scope.category)) {
        var name = $scope.category.selected.name;
        var data = {category: name};
        var url_to_post = '/fetch_kselected_category';
        $http.get(url_to_post, {params: data})
          .success(function (response) {
            if(response){
              $scope.items = $scope.remove_matching_samagri(response);
              $scope.itemsSize = $scope.items.length;
              $scope.category.hasSelected = true;
            }else{
            }
        });
      } else {
          $scope.items = []
          $scope.itemsSize = $scope.items.length;
      }
    };

    $scope.promise4 = $scope.fetchTags();

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

    $scope.openModal = function(items){
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'removeDependency.html',
        controller: 'RemoveDependencyCtrl',
        size: 'sm',
        backdrop: 'static',
        resolve: {
          items: function () {
            return items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        if($scope.selected == 'pandit')
          $scope.selectPanditDetails.subitems = $scope.multipleItmes.selectedPeople = [];
        else if($scope.selected == 'caterer')
          $scope.selectCatererDetails.subitems = $scope.multipleItmes.selectedCaterer = [];
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
        if(items.type == 'pandit')
          $scope.karyalayAttrDepUpdateForm.has_pandit = true;
        else if (items.type == 'caterer')
          $scope.karyalayAttrDepUpdateForm.has_caterer = true;
      });
    }

    $scope.uncheckedPandit = function() {
      if($scope.karyalayAttrDepUpdateForm.has_pandit == false) {
        if($scope.change_pandit) {
          var items = {
                        type: 'pandit',
                        label: 'Pandit',
                        message: 'Are you sure you want to remove all associated pandits ?'
                      };
          $scope.openModal(items);
        }
      } else {
        $scope.change_pandit = true;
      }
    };

    $scope.uncheckedCaterer = function() {
      if($scope.karyalayAttrDepUpdateForm.has_caterer == false) {
        if($scope.change_caterer) {
          var items = {
                        type: 'caterer',
                        label: 'Caterer',
                        message: 'Are you sure you want to remove all associated caterers ?'
                      };
          $scope.openModal(items);
        }
      } else {
        $scope.change_caterer = true;
      }
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
          $scope.karyalayPhotos = response.karyalay_photos;
          if(!_.isEmpty($scope.karyalayPandit)) {
            $scope.showNewPandit = false;
            $scope.radioAppointment.selected_pandit_type = 1;
          }
          if(!_.isEmpty($scope.karyalayCaterer)){
            $scope.showNewCaterer = false;
            $scope.radioAppointment.selected_caterer_type = 1;
          }
          if(response){
            $scope.extend($scope.karyalayUpdateForm, $scope.karyalayInfo);
            $scope.extend($scope.karyalayAttrUpdateForm, $scope.karyalayAttrInfo);
            $scope.extend($scope.karyalayAttrDepUpdateForm, $scope.karyalayAttrInfo);
            $scope.addPandit();
            $scope.addCaterer();
          }else{

          }
      });
      return promise
    };

    $scope.promise5 = $scope.fetchKaryalayInfo();

    $q.all([$scope.promise1, $scope.promise5])
      .then(function(results) {
        var pandits = $scope.map($scope.karyalayPandit, function(pandit){
          var pandit_index = $scope.findIndex($scope.panditList, {id: pandit.id});
          if(pandit_index >= 0) {
           return $scope.panditList[pandit_index] }
         });
        $scope.multipleItmes.selectedPeople = pandits;
      });

    $q.all([$scope.promise2, $scope.promise5])
      .then(function(results) {
        var caterers = $scope.map($scope.karyalayCaterer, function(caterer){
          var caterer_index = $scope.findIndex($scope.catererList, {id: caterer.id});
          if(caterer_index >= 0) {
           return $scope.catererList[caterer_index] }
         });
        $scope.multipleItmes.selectedCaterer = caterers;
      });

    $q.all([$scope.promise3, $scope.promise4, $scope.promise5])
    .then(function(results) {
      var samagris = $scope.map($scope.karyalaySamagri, function(samagri){
        var samagri_index = $scope.findIndex($scope.samagriList, {id: samagri.id});
        if(samagri_index >= 0) {
         return $scope.samagriList[samagri_index] }
       });
      $scope.multipleItmes.selectedItem = samagris;
      if(samagris.length > 0)
        $scope.category.hasSelected = true
      $scope.samagriList = $scope.remove_matching_samagri($scope.samagriList);
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
      if($scope.isEmpty($scope.karyalayAttrInfo)) {
        var url_to_post = '/karyalay_attributes';
        $scope.extend(data.karyalay_attr_list, {karyalay_lists_id: $scope.karyalay_lists_id});
        $http.post(url_to_post, data)
          .success(function (response) {
            if(response){
              $scope.karyalayAttrInfo = {id: response.id};
              $scope.updateSuccess();
            }else{
              $scope.updateFailure();
            }
        });
      }else{
        var url_to_post = '/karyalay_attributes/';
        $http.put(url_to_post + $scope.karyalayAttrInfo.id, data)
          .success(function (response) {
            if(response){
              $scope.updateSuccess();
            }else{
              $scope.createFailure();
            }
        });
      }
    };

    $scope.updateKaryalayDependency = function() {
      if($scope.isEmpty($scope.karyalayAttrInfo)) {
        var url_to_post = '/karyalay_attributes',
        data = $scope.extend($scope.karyalayAttrDepUpdateForm, {karyalay_lists_id: $scope.karyalay_lists_id});
        $http.post(url_to_post, {karyalay_attr_list: data})
          .success(function (response) {
            if(response){
              $scope.karyalayAttrInfo = {id: response.id};
            }else{
              $scope.updateFailure();
            }
        });
      }else {
        var url_to_post = '/karyalay_attributes/';
        data = {karyalay_attr_list: $scope.karyalayAttrDepUpdateForm};
        $http.put(url_to_post + $scope.karyalayAttrInfo.id, data)
          .success(function (response) {
            if(response.status)
              console.log(response);
            else
              $scope.createFailure();
          });
      }
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

      var pandit_to_keep = $scope.pluck(merged_pandits, 'id'),
      data = { karyalay_pandit_params: {karyalay_lists_id: $scope.karyalay_lists_id },
               pandit_to_keep: pandit_to_keep},
      url_to_post = '/pandit_to_keep';
      $http.post(url_to_post, data)
        .success(function (response) {
          console.log(response);
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

      var caterer_to_keep = $scope.pluck(merged_caterers, 'id'),
      data = { karyalay_caterer_params: {karyalay_lists_id: $scope.karyalay_lists_id },
               caterer_to_keep: caterer_to_keep},
      url_to_post = '/caterer_to_keep';
      $http.post(url_to_post, data)
        .success(function (response) {
          console.log(response);
      });

      //add samagri
      var data = {karyalay_samagri_params: {selected_item: $scope.multipleItmes.selectedItem || [], karyalay_lists_id: $scope.karyalay_lists_id}};
      var url_to_post = '/update_tags';
      $http.post(url_to_post, data)
        .success(function (response) {
          if(response){
            $scope.updateSuccess();
          }else{
            $scope.updateFailure();
          }
      });
    };

    $scope.updateKaryalayPhotos = function() {
      $scope.each($scope.karyalayGalleryUpdateForm.picFile, function(file){
        var data = {photos_list: {gallery: file, karyalay_list_id: $scope.karyalay_lists_id}}
        var url_to_post = '/photos';
        $scope.upload = Upload.upload({
          url: url_to_post,
          method: 'POST',
          fields: data,
          file: file,
          fileFormDataName: 'photos_list[gallery]'
        }).then(function (resp) {
            if(resp.data && resp.data.id){
              $scope.karyalayPhotos.push(resp.data);
              $scope.updateSuccess();
            }
        });
      });
    };

    $scope.removeKaryalayPhotos = function() {
      var images_to_remove = $scope.compact($scope.map($scope.karyalayGalleryUpdateForm.selectedImage, function(value, id){
        if(value == true)
          return id;
      }));
      $scope.each(images_to_remove, function(image_id){
        var url_to_delete = '/photos/' + image_id
        $http.delete(url_to_delete)
          .success(function (response) {
            $scope.karyalayPhotos = $scope.without($scope.karyalayPhotos, _.findWhere($scope.karyalayPhotos, {id: response.id}));
          });
      });
    };
  });
