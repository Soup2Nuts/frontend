'use strict';
angular.module('s2n.viewResults', ['ngRoute', 's2n.services', 's2n.apiService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: ' viewResults/viewResults.html',
    controller: 'ResultsCtrl'
  });
}])
    .controller('ResultsCtrl', ['$scope', '$mdDialog', '$window', '$timeout', 'apiService', function($scope, $mdDialog, $window, $timeout, apiService) {

    this.announceClick = announceClick;
    this.isFav = isFav;
    this.toggleFavorite = toggleFavorite;

    $scope.properties = ['title', 'cuisines', 'courses']; //add substitutions/favorite
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
    $scope.favs = [];

    //call the service to get all the recipe results for the page
    //TODO!!!!
    apiService.getFavorites().then(function(result){
        for(var i = 0; i< result.data.length; i++){
          $scope.recipes.push(result.data[i].recipe);
          console.log(result.data[i].recipe);
        }
    });

    apiService.getFavorites().then(function(result){
        for(var i = 0; i< result.data.length; i++){
          $scope.favs.push(result.data[i].recipe.title);
        }
        // console.log("Favs loaded: " + $scope.favs);
    });

    function isFav($recipe){
      var index = $scope.favs.indexOf($recipe.title)
      // console.log(index);
      if(index >= 0){
        return true;
      }
      return false;
    }

    function announceClick($index){
      $scope.selectedProperty = $scope.properties[$index];
    }

    function toggleFavorite($recipe){
      if(isFav($recipe)){
        var index = $scope.favs.indexOf($recipe.title);
        $scope.favs.splice(index, 1);
        apiService.deleteFavorite($recipe.title);
      }
      else{
        $scope.favs.push($recipe.title);
        console.log($recipe.title);
        apiService.addFavorite($recipe.title);
      }
      //toggle recipes favorite status using end point !!TODO
    }

    //Shows the custom recipe dialog
    $scope.showRecipeDialog = function(ev, $recipe){
      $mdDialog.show({
        controller: DialogController,
        templateUrl:'viewResults/recipeDialog.tmpl.html',
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
