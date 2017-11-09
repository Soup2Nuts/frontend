'use strict';

angular.module('s2n.viewAccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', [function() {

}]);