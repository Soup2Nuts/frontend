/**
 * Created by Ryley Sevier on 11/8/2017.
 */

'use strict';

angular.module('s2n.viewToolbar', ['ngRoute'])
    .controller('ToolbarCtrl', [function($mdDialog) {

        var originatorEv;

        this.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        this.redial = function() {
            $mdDialog.show(
                $mdDialog.alert()
                    .targetEvent(originatorEv)
                    .clickOutsideToClose(true)
                    .parent('body')
                    .title('Suddenly, a redial')
                    .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
                    .ok('That was easy')
            );

            originatorEv = null;
        };

    }]);