'use strict';

// Declare app level module which depends on views, and components
angular.module('s2n', [
    'ngMaterial',
    'ngRoute',
    's2n.services',
    's2n.apiService',
    's2n.viewToolbar',
    's2n.viewAbout',
    's2n.viewAccount',
    's2n.viewSearch',
    's2n.viewTemplate',
    's2n.version',
    's2n.viewRegister',
    's2n.viewLogin',
    's2n.viewPantry',
    's2n.viewFavorites',
    's2n.viewSearchOption'
    'angular-storage',
    'angular-jwt'
]).
    config(['$locationProvider', '$routeProvider',  function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/pantry'});
    }]).
    config(function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('orange')
            .warnPalette('red');
        //.backgroundPalette('light-green');
    }).
    run(['$http', '$cookies', function($http, $cookies) {
      $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
      $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }]);
