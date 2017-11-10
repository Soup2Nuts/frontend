'use strict';

angular.module('s2n.viewSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: ' viewSearch/viewSearch.html',
    controller: 'SearchCtrl'
  });
}])
    .controller('SearchCtrl', [function() {

}]);