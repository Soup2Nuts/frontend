'use strict';

angular.module('s2n.viewPantry', ['ngRoute', 's2n.services', 's2n.apiService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', {
    templateUrl: ' viewPantry/viewPantry.html',
    controller: 'PantryCtrl'
  });
}])
    .controller('PantryCtrl', ['$scope', '$http', '$mdDialog', '$window', '$timeout', 'apiService', function($scope, $http, $mdDialog, $window, $timeout, apiService) {
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
      $scope.foods = [];
      $scope.pantryItems = [];

      // //calling it on a delay as an example of not loading all at once
      // $timeout(function(){
      //     //call the service to get all the ingredients for the page
      //     apiService.getFoods().then(function(result){
      //         console.log(result.data);
      //         for(var i = 0; i< result.data.length; i++)
      //           $scope.foods.push(result.data[i].name);
      //     });
      //
      // }, 2000);

      //call the service to get all the ingredients for the page
      apiService.getFoods().then(function(result){
          console.log(result.data);
          for(var i = 0; i< result.data.length; i++){
            $scope.foods.push(result.data[i].name);
          }
      });

      //call the service to get all the users pantry for the page
      apiService.getPantry().then(function(result){
        console.log(result.data);
        for(var i = 0; i < result.data.length; i++){
            $scope.pantryItems.push(result.data[i].item);
        }
      });


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
        //call the service to add the item to the database
        apiService.addPantryItem(lowercaseItem);
      }
    };

    //Removes the specified item from the pantry, if it is in the pantry
      $scope.deletePantryItem = function($item) {
        var index = $scope.pantryItems.indexOf($item)
        if(index >= 0){
          $scope.pantryItems.splice(index, 1);
          apiService.deletePantryItem($item);
        }
      };

    //Prompts the user with a dialog to confirm whether they want to delete all pantry Items
    //Deletes all pantry items upon user confirmation
    //THIS COULD BE DONE BETTER WITH A CLEAR ALL END POINT
      $scope.confirmDeleteAll = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Would you like to delete all of the items in your pantry?')
              .textContent('Pantry items can not be recovered once deleted.')
              .ariaLabel('Delete all')
              .targetEvent(ev)
              .ok('Yes, I\'m sure.')
              .cancel('No, thank you.');
        $mdDialog.show(confirm).then(function() {
          for(var i = 0; i < $scope.pantryItems.length; i++){
            apiService.deletePantryItem($scope.pantryItems[i]);
          }
          $scope.pantryItems = []
        }, function() {
        });
      };


}]);
