'use strict';
 angular.module('s2n.apiService', ['ngStorage'])

 .factory('apiService', ['$http', '$localStorage', function($http, $localStorage){
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
       // return $http.get(urlBase + '/pantry/list/' + jsonEnd,  localStorage.token);
       return $http.get(urlBase + '/pantry/' + jsonEnd);
     }
   return apiService;
 }]);
