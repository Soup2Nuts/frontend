'use strict';

/*

Rough Directions

Create a copy of this entire directory and rename it to be relevant to your page

Rename anything with Template to the name of your view in this file, 
Rename anything with Template viewTemplate_tests.js file

Add the route to the index.html page for the ctrlTemplate.js

*/

angular.module('s2n.viewTemplate', ['ngRoute', 's2n.services'])

    .config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/template', {
    templateUrl: ' viewTemplate/viewTemplate.html',
    controller: 'TemplateCtrl'
  });
}])

    .controller('TemplateCtrl', ['apiService', function(apiService) {

        this.ingredients = [];

        //call the service to get all the ingredients for the page
        this.ingredients = apiService.getIngredients();
}]);