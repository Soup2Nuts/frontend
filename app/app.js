'use strict';

// Declare app level module which depends on views, and components
angular

.module('s2n', [
        'ngMaterial',
        'ngRoute',/*
        'ngCookies',*/
        's2n.viewToolbar',
        's2n.viewAbout',
        's2n.viewRegister',
        's2n.viewLogin',
        's2n.version'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}])

.config(function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('orange');
            //.backgroundPalette('light-green');
    });
