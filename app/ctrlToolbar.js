'use strict';

angular.module('s2n.viewToolbar', ['ngRoute', 's2n.services'])
    .controller('ToolbarCtrl', ['$mdDialog','$location', 'Authentication', function($mdDialog, $location, Authentication) {

        var originatorEv;
        var loggedIn = false;
        loggedIn = Authentication.authenticate();
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
          return loggedIn;
        };


    }]);
