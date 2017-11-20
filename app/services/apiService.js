'use strict';
 angular.module('s2n.apiService', ['angular-storage'])

 .factory('apiService', ['$http', function($http){

   // var apiService = {
   //   getFoods : getFoods,
   //   getCourses: getCourses,
   //   getCuisines: getCuisines,
   //   getRecipes: getRecipes,
   //   getPantry: getPantry,
   // };
   var apiService = {};

   //var urlBase = 'http://soup2nuts.us:90';
   var urlBase = 'http://127.0.0.1:8000/api';
   var jsonEnd = '?format=json';

   apiService.getFoods = function(){
     return $http.get(urlBase + '/foods/' + jsonEnd);
   }

   apiService.getRecipes = function(){
     return $http.get(urlBase + '/recipes/' + jsonEnd);
   }

   apiService.getCourses = function(){
     return $http.get(urlBase + '/courses/' + jsonEnd);
   }

   apiService.getCuisines = function(){
     return $http.get(urlBase + '/cuisines/' + jsonEnd);
   }

   apiService.getPantry = function(){
       return $http.get(urlBase + '/pantry/list/' + jsonEnd,  localStorage.currentUser.token);
     }
   return apiService;
 }]);
