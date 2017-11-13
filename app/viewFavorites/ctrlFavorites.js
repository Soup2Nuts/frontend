'use strict';
angular.module('s2n.viewFavorites', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/favorites', {
    templateUrl: ' viewFavorites/viewFavorites.html',
    controller: 'FavoritesCtrl'
  });
}])
    .controller('FavoritesCtrl', [function() {

}]);
