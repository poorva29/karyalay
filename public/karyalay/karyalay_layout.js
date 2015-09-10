var app = angular.module('KaryalayApp', [ 'ui.bootstrap', 'ngAnimate', 'flash', 'ui.checkbox', 'angular-underscore',
                                          'ui.select', 'ngSanitize', 'ng.bs.dropdown', 'Devise', 'ngRoute', 'ngStorage']);
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

  // ng route config
  app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'templates/karyalay_lists/karyalay-list.html'
        }).
        when('/karyalay_create', {
          templateUrl: 'templates/karyalay_lists/karyalay-create.html',
          controller: 'karyalayCreateCtrl'
        }).
        when('/karyalay_update', {
          templateUrl: 'templates/karyalay_lists/karyalay-update.html',
        }).
        otherwise({
          redirectTo: function(current, path, search) {
            if(search.goto) {
              return '/' + search.goto;
            }
            return '/'
          }
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