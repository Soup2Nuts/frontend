'use strict';

angular.module('s2n.viewPantry', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', {
    templateUrl: ' viewPantry/viewPantry.html',
    controller: 'PantryCtrl'
  });
}])
    .controller('PantryCtrl', ['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog) {
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

      $scope.deletePantryItem = function($item) {
        var index = $scope.pantryItems.indexOf($item)
        $scope.pantryItems.splice(index, 1);
      }

      $scope.confirmDeleteAll = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Would you like to delete all of the items in your pantry?')
              .textContent('Pantry items can not be recovered once deleted.')
              .ariaLabel('Delete all')
              .targetEvent(ev)
              .ok('Yes, I\'m sure.')
              .cancel('No, thank you.');
        $mdDialog.show(confirm).then(function() {
          $scope.pantryItems = []
        }, function() {
        });
      };


}]);
