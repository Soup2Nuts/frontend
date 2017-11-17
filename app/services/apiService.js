 angular.module('s2n.apiService', [])

 .factory('apiService', ['$http', function($http){

 var apiService = {};

 //var urlBase = 'http://soup2nuts.us:90';
 var urlBase = 'http://127.0.0.1:8000';
 var jsonEnd = '?format=json';

 //http://soup2nuts.us:90/ingredients/?format=json
 apiService.getIngredients = function(){
 return $http.get(urlBase + '/ingredients/' + jsonEnd);
 }

 apiService.getFoods = function(){
 return $http.get(urlBase + '/foods/' + jsonEnd);
 }


 return apiService;

 }]);
