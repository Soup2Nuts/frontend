'use strict';

// Declare app level module which depends on views, and components
angular.module('s2n', [
    'ngMaterial',
    'ngRoute',
    's2n.viewToolbar',
    's2n.viewAbout',
    's2n.viewAccount',
    's2n.viewSearch',
    's2n.viewTemplate',
    's2n.version'
    

]).
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/home'});
    }]).
    config(function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('orange');
        //.backgroundPalette('light-green');
    });
