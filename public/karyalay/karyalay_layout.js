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

  app.factory('storeKaryalayInfo', function($localStorage) {
    $storage = $localStorage;
    var karyalay_id;
    function setKaryalayInfo(data) {
      karyalay_id = data;
      $storage.karyalay_id = data;
    }
    function getKaryalayInfo() {
     return karyalay_id || $storage.karyalay_id;
    }
    return {
     setKaryalayInfo: setKaryalayInfo,
     getKaryalayInfo: getKaryalayInfo
    }
  });

  app.factory('storeUserInfo', function() {
    var userRole;
    function setUserInfo(data) {
      userRole = data;
    }
    function getUserInfo() {
     return userRole;
    }
    return {
     setUserInfo: setUserInfo,
     getUserInfo: getUserInfo
    }
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
      // Routes for admin
      $stateProvider
        .state('karyalay_list', {
          url: "/karyalay_list",
          templateUrl: "templates/karyalay_lists/karyalay-list.html",
          data: {checkUser: true}
        })
        .state('karyalay_create', {
          url: "/karyalay_create",
          templateUrl: "templates/karyalay_lists/karyalay-create.html",
          data: {checkUser: true}
        })
        .state('karyalay_update', {
          url: "/karyalay_update",
          templateUrl: "templates/karyalay_lists/karyalay-update.html",
          data: {checkUser: true}
        })
        .state('karyalay_book', {
          url: "/karyalay_book",
          templateUrl: "templates/karyalay_lists/karyalay-book.html",
          data: {checkUser: true}
        });

        // For all visitors and admin
        $stateProvider
        .state('karyalay_show_all', {
          url: "/",
          templateUrl: "templates/karyalay_lists/karyalay-show-all.html",
          data: {checkAdmin: true}
        })

        //Error pages
        $stateProvider
          .state('page403', {
            url: '/forbidden',
            templateUrl: 'templates/error/403.html'
          })
          .state('page500', {
            url: '/internalservererror',
            templateUrl: 'templates/error/500.html'
          });

        // To remove '#' from url use html5Mode (base url is set in <head> tag)
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }]);

  app.run(["$rootScope", "$state", "$window", "$location", "$http", "storeUserInfo",
  function ($rootScope, $state, $window, $location, $http, storeUserInfo) {
    // on change of state, check if user should be logged in to access the page.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var promiseObj = function(){
        return $http.get('user_role_name')
          .success(function (response) {
            var userRole = response.user_role
            storeUserInfo.setUserInfo(userRole);
            $rootScope.is_admin = (userRole == 'Admin' ? true : false);
            return userRole;
          });
      };

      if(toState.data && toState.data.checkUser) {
        var userRole = storeUserInfo.getUserInfo();
        if(userRole){
          if(userRole && userRole != 'Admin') {
            $location.path('/forbidden');
          }
        }else {
          $http.get('user_role_name')
          .success(function (response) {
            var userRole = response.user_role
            storeUserInfo.setUserInfo(userRole);
            $rootScope.is_admin = (userRole == 'Admin' ? true : false);
            if(userRole && userRole != 'Admin') {
              $location.path('/forbidden');
            }
          });
        }
      }else if(toState.data && toState.data.checkAdmin) {
        promiseObj();
      }
    });
  }]);

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