'use strict';

angular.module('s2n.viewPantry', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', {
    templateUrl: ' viewPantry/viewPantry.html',
    controller: 'PantryCtrl'
  });
}])
    .controller('PantryCtrl', ['$scope', function($scope, $http) {
      angular.module('fabSpeedDialDemoBasicUsage', ['ngMaterial'])
      this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];
      this.isOpen = false;
      this.selectedDirection = 'up';

      this.noCache = "true"
      this.querySearch = querySearch;

      $scope.foods = [
        "celery stalks",
        "beet",
        "jicama",
        "flat-leaf parsely",
        "angel food cake mix",
        "egg whites",
        "head of cauliflower",
        "container ricotta cheese",
        "tomato puree",
        "elbow macaroni",
        "extra-sharp cheddar cheese",
        "dry crunchy cereal",
        "scallions",
        "dried fruit",
        "apple slices",
        "bran cereal",
        "frozen yogurt",
        "pancake mix",
        "dry milk powder",
        "peach",
        "lemon",
        "vanilla",
        "red wine vinegar",
        "chopped pecans",
        "frozen fruit juice concentrated"
    ];

    $scope.pantryItems = [
       'chopped pecans',
       'frozen yogurt',
       'dry crunchy cereal',
       'red wine vinegar'
     ];

     $scope.selected = []

     // $scope.querySearch = function(query) {
     //    return $http
     //    .get(BACKEND_URL + '/items/' + query)
     //    .then(function(data) {
     //    // Map the response object to the data object.
     //      return data;
     //    });
     //  };


     function querySearch (query) {
       return $scope.foods.filter(createFilterFor(query) );
       //return query ? $scope.foods.filter(createFilterFor(query) ) : $scope.foods;
     }
    /**
     * Create filter function for search text
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(food) {
        return !$scope.pantryItems.includes(food) && (!query||food.indexOf(lowercaseQuery) !== -1);
      };
    }

    $scope.addToPantry = function(){
      if($scope.foods.includes($scope.selectedItem) && !$scope.pantryItems.includes($scope.selectedItem)){
        $scope.pantryItems.push($scope.selectedItem);
        $scope.selectedItem = "";
      }
    }

    $scope.toggle = function(item, list){
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
      };

      $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
      };

      $scope.isIndeterminate = function() {
      return ($scope.selected.length !== 0 &&
          $scope.selected.length !== $scope.pantryItems.length);
      };

      $scope.isChecked = function() {
      return $scope.selected.length === $scope.pantryItems.length;
      };

      $scope.toggleAll = function() {
      if ($scope.selected.length === $scope.pantryItems.length) {
        $scope.selected = [];
      } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
        $scope.selected = $scope.pantryItems.slice(0);
      }
      };

      $scope.deletePantryItems = function() {
        for(var idx = 0; idx < $scope.pantryItems.length; idx++){
          if($scope.selected.indexOf($scope.pantryItems[idx]) > -1){
            $scope.pantryItems.splice(idx, 1);
            idx--;
          }
        }
        $scope.selected = []
      }

}]);
