'use strict';

angular.module('s2n.viewToolbar', ['ngRoute', 's2n.services'])
    .controller('ToolbarCtrl', ['$mdDialog','$location', 'Authentication', function($mdDialog, $location, Authentication) {

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

        this.logout = function(){
            Authentication.logout()
        };
    }]);
