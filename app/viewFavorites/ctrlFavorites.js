'use strict';
angular.module('s2n.viewFavorites', ['ngRoute', 's2n.services', 's2n.apiService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/favorites', {
    templateUrl: ' viewFavorites/viewFavorites.html',
    controller: 'FavoritesCtrl'
  });
}])
    .controller('FavoritesCtrl', ['$scope', '$mdDialog', '$window', '$timeout', 'apiService', function($scope, $mdDialog, $window, $timeout, apiService) {
    this.announceClick = announceClick;
    $scope.properties = ['title', 'cuisines', 'courses'];
    $scope.selectedProperty = 'title';

    $scope.desktopTemplate = false;
    $scope.mobileTemplate = false;
    var screenWidth = $window.innerWidth;
    if (screenWidth < 700){
        $scope.mobileTemplate = true;
    }else{
        $scope.desktopTemplate = true;
    }
    //NOTE: recipe's courses and cuisines should be pre-sorted alphabetically
    $scope.recipes = [];
    //call the service to get all the ingredients for the page
    apiService.getFavorites().then(function(result){
        for(var i = 0; i< result.data.length; i++){
          $scope.recipes.push(result.data[i].recipe);
          console.log(result.data[i].recipe);
        }
    });

    function announceClick($index){
      $scope.selectedProperty = $scope.properties[$index];
    }
    $scope.deleteFavorite = function($recipe){
      var index = $scope.recipes.indexOf($recipe)
      $scope.recipes.splice(index, 1);
    };

    //Shows the custom recipe dialog
    $scope.showRecipeDialog = function(ev, $recipe){
      $mdDialog.show({
        controller: DialogController,
        templateUrl:'viewFavorites/recipeDialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {recipe: $recipe}
      });
    };

    function DialogController($scope, $mdDialog, recipe) {
      $scope.recipe = recipe;
      $scope.getStringIngredients = function(){
          var results = [];
          $scope.recipe.ingredients.forEach(function(ingredient){
            var s = ingredient.quantity + " " + ingredient.name;
            s += ingredient.notes.length==0? "": (" (" + ingredient.notes + ")");
            results.push(s);
          });
          return results;
      };

      $scope.getCourseList = function(){
        var list = ""
        for(var i = 0; i < $scope.recipe.courses.length; i++)
        {
          list += $scope.recipe.courses[i];
          if(i != ($scope.recipe.courses.length-1))
            list += ", ";
        }
        return list;
      };
      $scope.getCuisineList = function(){
        var list = ""
        for(var i = 0; i < $scope.recipe.cuisines.length; i++)
        {
          list += $scope.recipe.cuisines[i];
          if(i != ($scope.recipe.cuisines.length-1))
            list += ", ";
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
