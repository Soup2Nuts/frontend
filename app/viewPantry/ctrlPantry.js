'use strict';

angular.module('s2n.viewPantry', ['ngRoute', 's2n.services', 's2n.apiService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', {
    templateUrl: ' viewPantry/viewPantry.html',
    controller: 'PantryCtrl'
  });
}])
    .controller('PantryCtrl', ['$scope', '$http', '$mdDialog', '$window', '$timeout', 'apiService', function($scope, $http, $mdDialog, $window, $timeout, apiService) {
      this.noCache = "true"
      this.querySearch = querySearch
      this.announceClick = announceClick;
      $scope.properties = ['title', 'cuisines', 'courses'];
      $scope.selectedProperty = 'title';

      $scope.desktopTemplate = false; //Boolean used in modifying the view to support small screens
      $scope.mobileTemplate = false;  //Boolean used in modifying the view to support small screens
      var screenWidth = $window.innerWidth;
      if (screenWidth < 700){
          $scope.mobileTemplate = true;
      }else{
          $scope.desktopTemplate = true;
      }

      //Recipe's and favorite recipes's courses and cuisines should be pre-sorted alphabetically
      $scope.foods = [];
      $scope.pantryItems = [];
      $scope.recipes = [];

      //call the api service to get all the ingredients for the page
      apiService.getFoods().then(function(result){
          for(var i = 0; i< result.data.length; i++){
            $scope.foods.push(result.data[i].name);
          }
      });

      //Call the api service to get the user's pantry
      apiService.getPantry().then(function(result){
        for(var i = 0; i < result.data.length; i++){
            $scope.pantryItems.push(result.data[i].item);
        }
      });

      //Call the api service to get the user's favorite recipes
      apiService.getFavorites().then(function(result){
          for(var i = 0; i< result.data.length; i++){
            $scope.recipes.push(result.data[i].recipe);
          }
      });

      //Filters the list of foods removing foods that are currently in the pantry and foods that do not contain the query/searchText
      function querySearch (query) {
       return $scope.foods.filter(createFilterFor(query));
      }

      //Create filter function for search text
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(food) {
          return !$scope.pantryItems.includes(food) && (!query||food.indexOf(lowercaseQuery) !== -1);
        };
      }

      //Add the selected food to the pantry if it is in the list of known foods and not in the pantry currently
      //Clears the selectedItem/searchText
      $scope.addToPantry = function(){
        var lowercaseItem = angular.lowercase($scope.selectedItem);
        if($scope.foods.includes(lowercaseItem) && !$scope.pantryItems.includes(lowercaseItem)){
          $scope.pantryItems.push(lowercaseItem);
          $scope.selectedItem = "";
          //call the service to add the item to the database
          apiService.addPantryItem(lowercaseItem);
          console.log($scope.pantryItems);
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
      //Note: this could be done better i.e. with a single server request, if a different API enpoint were made
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

      //Used to change the property by the list of the user's favorite recipes is sorted
      function announceClick($index){
        $scope.selectedProperty = $scope.properties[$index];
      }

      //Removes a recipe from the user's favorite recipes
      $scope.deleteFavorite = function($recipe){
        var index = $scope.recipes.indexOf($recipe)
        apiService.deleteFavorite($scope.recipes[index].title);
        $scope.recipes.splice(index, 1);
      };

      //Shows the custom recipe dialog
      $scope.showRecipeDialog = function(ev, $recipe){
        $mdDialog.show({
          controller: DialogController,
          templateUrl:'viewPantry/recipeDialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: true,
          locals: {recipe: $recipe}
        });
      };

      //Controller for the custom recipe dialog
      function DialogController($scope, $mdDialog, recipe) {
        $scope.recipe = recipe;
        //Returns an array of the nicely formatted strings of the recipes ingredients
        $scope.getStringIngredients = function(){
            var results = [];
            $scope.recipe.ingredients.forEach(function(ingredient){
              var s = ingredient.quantity + " " + ingredient.name;
              s += ingredient.notes.length==0? "": (" (" + ingredient.notes + ")");
              results.push(s);
            });
            return results;
        };
        //Formats the specified recipe's courses into a comma separated string
        $scope.getCourseList = function(){
          var list = ""
          for(var i = 0; i < $scope.recipe.courses.length; i++){
            list += $scope.recipe.courses[i];
            if(i != ($scope.recipe.courses.length-1)){
              list += ", ";
            }
          }
          return list;
        };
        //Formats the specified recipe's cuisines into a comma separated string
        $scope.getCuisineList = function(){
          var list = ""
          for(var i = 0; i < $scope.recipe.cuisines.length; i++)
          {
            list += $scope.recipe.cuisines[i];
            if(i != ($scope.recipe.cuisines.length-1)){
              list += ", ";
            }
          }
          return list;
        };
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }

      //Formats the specified recipe's courses into a comma separated string
      $scope.getCourseList = function($recipe){
        var list = ""
        for(var i = 0; i < $recipe.courses.length; i++){
          list += $recipe.courses[i];
          if(i != ($recipe.courses.length-1))
            list += ", ";
        }
        return list;
      };

      //Formats the specified recipe's cuisines into a comma separated string
      $scope.getCuisineList = function($recipe){
        var list = ""
        for(var i = 0; i < $recipe.cuisines.length; i++){
          list += $recipe.cuisines[i];
          if(i != ($recipe.cuisines.length-1)){
            list += ", ";
          }
        }
        return list;
      };
}]);
