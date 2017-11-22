'use strict';
angular.module('s2n.viewSearch', ['ngRoute', 's2n.apiService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: ' viewSearch/viewSearch.html',
    controller: 'SearchCtrl',
  });
}])
    .controller('SearchCtrl', ['$scope', '$mdDialog', '$window', '$timeout', 'apiService', function($scope, $mdDialog, $window, $timeout, apiService) {

    this.announceClick = announceClick;
    this.isFav = isFav;
    this.toggleFavorite = toggleFavorite;
    this.getResults = getResults;

    $scope.properties = ['title', 'cuisines', 'courses']; //add substitutions/favorite
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
    $scope.recipes = [];
    $scope.favs = [];
    $scope.cuisines = [];
    $scope.courses = [];
    $scope.selectedCuisines = [];
    $scope.selectedCourses = [];

    //Call the api service to get the cuisines
    apiService.getCuisines().then(function(result){
        for(var i = 0; i< result.data.length; i++){
          $scope.cuisines.push(result.data[i].name);
        }
    });

    //Call the api service to get the courses
    apiService.getCourses().then(function(result){
        for(var i = 0; i< result.data.length; i++){
          $scope.courses.push(result.data[i].name);
        }
    });

    //Call the service to get the search results
    //TODO!!!!
    function getResults(){
      result = apiService.getSearchResults($scope.selectedCourses, $scope.selectedCuisines);
      for(var i = 0; i< result.data.length; i++){
        $scope.recipes.push(result.data[i].recipe);
      }
    }

    //Call the service to get the user's favorite recipes
    apiService.getFavorites().then(function(result){
        for(var i = 0; i< result.data.length; i++){
          $scope.favs.push(result.data[i].recipe.title);
        }
    });

    //Returns whether the specfied recipe is part of the user's favorite recipes
    function isFav($recipe){
      var index = $scope.favs.indexOf($recipe.title)
      if(index >= 0){
        return true;
      }
      return false;
    }

    //Used to change the property by the list of the user's favorite recipes is sorted
    function announceClick($index){
      $scope.selectedProperty = $scope.properties[$index];
    }

    //If the specified recipe is part of the user's favorite recipes, removes the specified recipe from the user's favorite recipes
    //If the specified recipe is not part of the user's favorite recipes, addss the specified recipe to the user's favorite recipes
    function toggleFavorite($recipe){
      if(isFav($recipe)){
        var index = $scope.favs.indexOf($recipe.title);
        $scope.favs.splice(index, 1);
        apiService.deleteFavorite($recipe.title);
      }
      else{
        $scope.favs.push($recipe.title);
        apiService.addFavorite($recipe.title);
      }
    }

    //Shows the custom recipe dialog
    $scope.showRecipeDialog = function(ev, $recipe){
      $mdDialog.show({
        controller: DialogController,
        templateUrl:'viewSearch/recipeDialog.tmpl.html',
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
      for(var i = 0; i < $recipe.courses.length; i++)
      {
        list += $recipe.courses[i];
        if(i != ($recipe.courses.length-1))
          list += ", ";
      }
      return list;
    };

    //Formats the specified recipe's cuisines into a comma separated string
    $scope.getCuisineList = function($recipe){
      var list = ""
      for(var i = 0; i < $recipe.cuisines.length; i++)
      {
        list += $recipe.cuisines[i];
        if(i != ($recipe.cuisines.length-1))
          list += ", ";
      }
      return list;
    };
}]);
