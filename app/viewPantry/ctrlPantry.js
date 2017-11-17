'use strict';

angular.module('s2n.viewPantry', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', {
    templateUrl: ' viewPantry/viewPantry.html',
    controller: 'PantryCtrl'
  });
}])
    .controller('PantryCtrl', ['$scope', '$http', '$mdDialog', '$window', function($scope, $http, $mdDialog, $window) {
      angular.module('fabSpeedDialDemoBasicUsage', ['ngMaterial'])

      this.noCache = "true"
      this.querySearch = querySearch;
      $scope.desktopTemplate = false;
      $scope.mobileTemplate = false;
      var screenWidth = $window.innerWidth;
      if (screenWidth < 700){
          $scope.mobileTemplate = true;
      }else{
          $scope.desktopTemplate = true;
      }
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

     //Filters the list of foods removing foods that are currently in the pantry and foods that do not contain the query/searchText
     function querySearch (query) {
       return $scope.foods.filter(createFilterFor(query) );
     }
      //Create filter function for search text
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(food) {
        return !$scope.pantryItems.includes(food) && (!query||food.indexOf(lowercaseQuery) !== -1);
      };
    }

    //Add the selected food to the pantry if it is in the list of known foods and not in the pantry currently
    //clears the selectedItem/searchText
    $scope.addToPantry = function(){
      var lowercaseItem = angular.lowercase($scope.selectedItem);
      if($scope.foods.includes(lowercaseItem) && !$scope.pantryItems.includes(lowercaseItem)){
        $scope.pantryItems.push(lowercaseItem);
        $scope.selectedItem = "";
      }
    };

    //Removes the specified item from the pantry, if it is in the pantry
      $scope.deletePantryItem = function($item) {
        var index = $scope.pantryItems.indexOf($item)
        if(index >= 0){
          $scope.pantryItems.splice(index, 1);
        }
      };

    //Prompts the user with a dialog to confirm whether they want to delete all pantry Items
    //Deletes all pantry items upon user confirmation
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
