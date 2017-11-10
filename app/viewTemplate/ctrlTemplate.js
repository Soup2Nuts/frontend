'use strict';

/*

Rough Directions

Create a copy of this entire directory and rename it to be relevant to your page

Rename anything with Template to the name of your view in this file, 
Rename anything with Template viewTemplate_tests.js file

Add the route to the index.html page for the ctrlTemplate.js



*/

angular.module('s2n.viewTemplate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/template', {
    templateUrl: ' viewTemplate/viewTemplate.html',
    controller: 'TemplateCtrl'
  });
}])
    .controller('TemplateCtrl', [function() {

}]);