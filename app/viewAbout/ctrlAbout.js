'use strict';

angular.module('s2n.viewAbout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: ' viewAbout/viewAbout.html',
    controller: 'AboutCtrl'
  });
}])
    .controller('AboutCtrl', [function() {

}]);