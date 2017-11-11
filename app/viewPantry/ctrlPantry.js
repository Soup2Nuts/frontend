'use strict';

angular.module('s2n.viewPantry', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', {
    templateUrl: ' viewPantry/viewPantry.html',
    controller: 'PantryCtrl'
  });
}])
    .controller('PantryCtrl', ['$scope', function($scope) {
      var self = this
      angular.module('fabSpeedDialDemoBasicUsage', ['ngMaterial'])
      this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];
      this.isOpen = false;
      this.selectedDirection = 'up';

      $scope.foods = [
       { name: 'Pepperoni', selected: false },
       { name: 'Sausage', selected: false },
       { name: 'Black Olives', selected: false },
       { name: 'Green Peppers', selected: false }
     ];
}]);