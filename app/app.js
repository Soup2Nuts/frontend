'use strict';

// Declare app level module which depends on views, and components
angular.module('s2n', [
    'ngMaterial',
    'ngRoute',
    'angular-jwt',
    'ngStorage',
    /*'ngCookies',*/
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
    's2n.viewSearchOption',
    's2n.viewResults',
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
    run(function($rootScope, $http, $location, $localStorage) {
        var urlBase = 'http://127.0.0.1:8000/auth';
        //Keep user logged in after page refresh
        if ($localStorage.token){
            // $localStorage.token = $http.post(urlBase +'/jwt/refresh/', {token : $localStorage.token});
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;
        }
    }).
    config(['$httpProvider', 'jwtInterceptorProvider', 'jwtOptionsProvider', function($httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
        jwtOptionsProvider.config({whiteListedDomains: ['soup2nuts.us', '127.0.0.1:8887', '127.0.0.1:8000']});
        jwtInterceptorProvider.tokenGetter = function($localStorage) {
            return $localStorage.token;
        };
        // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
        $httpProvider.interceptors.push('jwtInterceptor');
  }]);
