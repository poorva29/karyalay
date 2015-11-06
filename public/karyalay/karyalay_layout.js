//starting point of angular application
//all the angular configurations will be maintained here
var app = angular.module('KaryalayApp', [ 'ui.bootstrap', 'ngAnimate', 'flash', 'ui.checkbox', 'angular-underscore',
                                          'ui.select', 'ngSanitize', 'ng.bs.dropdown', 'Devise', 'ngStorage',
                                          'ui.calendar', 'dnTimepicker', 'ngBootbox', 'ngFileUpload', 'ui.router']);
  // ui-select filter
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

  // devise athentication config
  app.config(function(AuthProvider) {
    AuthProvider.loginPath('sign_in.json');
    AuthProvider.resourceName('');
    AuthProvider.logoutPath('sign_out.json');
    AuthProvider.logoutMethod('GET');
  })

  // ui route config
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      // For any unmatched url, redirect to /karyalay_list
      $urlRouterProvider.otherwise("/");
      //
      // Now set up the states
      $stateProvider
        .state('karyalay_list', {
          url: "/",
          templateUrl: "templates/karyalay_lists/karyalay-list.html"
        })
        .state('karyalay_create', {
          url: "/karyalay_create",
          templateUrl: "templates/karyalay_lists/karyalay-create.html"
        })
        .state('karyalay_update', {
          url: "/karyalay_update",
          templateUrl: "templates/karyalay_lists/karyalay-update.html"
        })
        .state('karyalay_book', {
          url: "/karyalay_book",
          templateUrl: "templates/karyalay_lists/karyalay-book.html",
        });

        // To remove '#' from url use html5Mode (base url is set in <head> tag)
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }]);


  app.factory('storeKaryalayInfo', function($localStorage) {
    $storage = $localStorage;$localStorage;
    function setKaryalayInfo(data) {
      $storage.karyalay_id = data;
    }
    function getKaryalayInfo() {
     return $localStorage.karyalay_id;
    }
    return {
     setKaryalayInfo: setKaryalayInfo,
     getKaryalayInfo: getKaryalayInfo
    }
  });

  //layout controller
  app.controller('karyalayLayoutCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window) {
    $scope.logout = function(){
      var config = {
        headers: {
          'X-HTTP-Method-Override': 'GET'
        }
      };
      Auth.logout(config).then(function(oldUser) {
        $window.location = '/sign_out';
      }, function(error) {
        // An error occurred logging out.
      });
    }

    Auth.currentUser().then(function(user) {
      $scope.user = user;
      $scope.userToShow = user.first_name + ' ' + user.last_name
    }, function(error) {
      // unauthenticated error
    });
  });

  // for adding/removing of caterer/pandit
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