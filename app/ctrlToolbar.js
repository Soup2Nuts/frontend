'use strict';

angular.module('s2n.viewToolbar', ['ngRoute', 's2n.services', 'ngStorage', 'angular-jwt'])
    .controller('ToolbarCtrl', ['$mdDialog','$location', 'Authentication', '$localStorage', 'jwtHelper', function($mdDialog, $location, Authentication, $localStorage, jwtHelper) {

        var originatorEv;
        this.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        this.routeAbout = function(){
            $location.path('/about');
        };

        this.routeAccount = function(){
            $location.path('/account');
        };
        this.switchLogged = function(){
            if(Authentication.authenticate()){
              Authentication.logout();
            }
            else{
              $location.path('/login');
            }
        };
        this.loggedIn = function(){
            if($localStorage.token){
              return !jwtHelper.isTokenExpired($localStorage.token);
            }
            return false;
        };
    }]);
