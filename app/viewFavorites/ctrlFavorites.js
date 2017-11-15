'use strict';
angular.module('s2n.viewFavorites', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/favorites', {
    templateUrl: ' viewFavorites/viewFavorites.html',
    controller: 'FavoritesCtrl'
  });
}])
    .controller('FavoritesCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    this.announceClick = announceClick;
    $scope.properties = ['title', 'cuisines', 'courses'];
    $scope.selectedProperty = 'title';

    //NOTE: recipe's courses and cuisines should be pre-sorted alphabetically
    $scope.recipes = [
          {
              "title": "Banana Split Oatmeal",
              "source": "https://whatscooking.fns.usda.gov/recipes/supplemental-nutrition-assistance-program-snap/banana-split-oatmeal",
              "cuisines": ["American"],
              "courses": [
                  "Breakfast"
              ],
              "ingredients": [
                  {
                      "quantity": {
                          "fraction": "1/3",
                          "unit": "C"
                      },
                      "food": "oatmeal",
                      "notes": "dry quick-cooking"
                  },
                  {
                      "quantity": {
                          "fraction": "1/8",
                          "unit": "tsp"
                      },
                      "food": "salt",
                      "notes": ""
                  },
                  {
                      "quantity": {
                          "fraction": "3/4",
                          "unit": "C"
                      },
                      "food": "water",
                      "notes": "very hot"
                  },
                  {
                      "quantity": {
                          "fraction": "1/2",
                          "unit": ""
                      },
                      "food": "banana",
                      "notes": "sliced"
                  },
                  {
                      "quantity": {
                          "fraction": "1/2",
                          "unit": "C"
                      },
                      "food": "frozen yogurt",
                      "notes": "non-fat"
                  }
              ]
          },
          {
              "title": "Summer Fruit Salad",
              "source": "https://whatscooking.fns.usda.gov/recipes/supplemental-nutrition-assistance-program-snap/summer-fruit-salad",
              "cuisines": [],
              "courses": [
                  "Dessert",
                  "Salad"
              ],
              "ingredients": [
                  {
                      "quantity": {
                          "fraction": "1",
                          "unit": "C"
                      },
                      "food": "strawberries",
                      "notes": "diced fresh or frozen"
                  },
                  {
                      "quantity": {
                          "fraction": "1",
                          "unit": "C"
                      },
                      "food": "watermelon",
                      "notes": "cubed"
                  },
                  {
                      "quantity": {
                          "fraction": "1",
                          "unit": "C"
                      },
                      "food": "pineapple chunks",
                      "notes": "fresh or canned packed in natural juice and do not drain"
                  }
              ]
          },
          {
              "title": "Chicken Vegetable Soup with Kale",
              "source": "https://whatscooking.fns.usda.gov/recipes/supplemental-nutrition-assistance-program-snap/chicken-vegetable-soup-kale",
              "cuisines": ["American"],
              "courses": [
                  "Soup"
              ],
              "ingredients": [
                  {
                      "quantity": {
                          "fraction": "2",
                          "unit": "tsp"
                      },
                      "food": "vegetable oil",
                      "notes": ""
                  },
                  {
                      "quantity": {
                          "fraction": "1/2",
                          "unit": "C"
                      },
                      "food": "onion",
                      "notes": "chopped"
                  },
                  {
                      "quantity": {
                          "fraction": "1/2",
                          "unit": "C"
                      },
                      "food": "carrot",
                      "notes": "chopped"
                  },
                  {
                      "quantity": {
                          "fraction": "1",
                          "unit": "tsp"
                      },
                      "food": "thyme",
                      "notes": "ground"
                  },
                  {
                      "quantity": {
                          "fraction": "2",
                          "unit": ""
                      },
                      "food": "garlic clove",
                      "notes": "minced"
                  },
                  {
                      "quantity": {
                          "fraction": "2",
                          "unit": "C"
                      },
                      "food": "water",
                      "notes": "or chicken broth"
                  },
                  {
                      "quantity": {
                          "fraction": "3/4",
                          "unit": "C"
                      },
                      "food": "tomatoes",
                      "notes": "diced"
                  },
                  {
                      "quantity": {
                          "fraction": "1",
                          "unit": "C"
                      },
                      "food": "chicken",
                      "notes": "cooked skinned and cubed"
                  },
                  {
                      "quantity": {
                          "fraction": "1/2",
                          "unit": "C"
                      },
                      "food": "brown rice",
                      "notes": "cooked or white rice"
                  },
                  {
                      "quantity": {
                          "fraction": "1",
                          "unit": "C"
                      },
                      "food": "kale",
                      "notes": "chopped about one large leaf"
                  }
              ]
          }
    ];

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
            var s = ingredient.quantity.fraction + " " + ingredient.quantity.unit + " " + ingredient.food;
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
