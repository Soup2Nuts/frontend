'use strict';

angular.module('s2n.viewToolbar', ['ngRoute'])
    .controller('ToolbarCtrl', [function($mdDialog, $location) {

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

    }]);