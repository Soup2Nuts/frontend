'use strict';

angular.module('s2n.viewToolbar', ['ngRoute', 's2n.services', 'ngStorage'])
    .controller('ToolbarCtrl', ['$mdDialog','$location', 'Authentication', '$localStorage', function($mdDialog, $location, Authentication, $localStorage) {

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
        //FIX LATER TO ALSO CHECK IF TOKEN IS VALID
        this.loggedIn = function(){
          if($localStorage.token){
            return true;
          }
          return false;
        };
    }]);
