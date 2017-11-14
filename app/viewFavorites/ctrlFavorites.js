'use strict';
angular.module('s2n.viewFavorites', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/favorites', {
    templateUrl: ' viewFavorites/viewFavorites.html',
    controller: 'FavoritesCtrl'
  });
}])
    .controller('FavoritesCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    $scope.recipes = [
          {
              "title": "Banana Split Oatmeal",
              "source": "https://whatscooking.fns.usda.gov/recipes/supplemental-nutrition-assistance-program-snap/banana-split-oatmeal",
              "cuisines": [],
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
              "cuisines": [],
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

    $scope.deleteFavorite = function($recipe){
      var index = $scope.recipes.indexOf($recipe)
      $scope.recipes.splice(index, 1);
    }

    //REMOVE LATER
    var dialogTemplate =
                          "<div layout=\"row\" layout-fill layout-align=\"center center\" >" +
                            "<p>"+
                                "STUFF"+
                            "</p>"+
                          "</div>";

    //I assume this is the problem, also why isn't it $ev?
    $scope.showRecipeDialog = function(ev){
      $mdDialog.show({
        controller: DialogController,
        //templateUrl: 'recipeDialog.tmpl.html',  //NOT OKAY
        template: dialogTemplate,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

}]);
