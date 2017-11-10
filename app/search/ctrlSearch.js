'use strict';

angular.module('s2n.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: ' search/search.html',
    controller: 'SearchCtrl'
  });
}])
    .controller('SearchCtrl', [function() {

}]);