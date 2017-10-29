'use strict';

angular.module('s2n.viewHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: ' viewHome/viewHome.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', [function() {

}]);