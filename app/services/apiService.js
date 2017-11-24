'use strict';
 angular.module('s2n.apiService', ['ngStorage'])

 .factory('apiService', ['$http', '$localStorage', '$q', function($http, $localStorage, $q){
   var apiService = {};

   //var urlBase = 'http://soup2nuts.us:90';
   var urlBase = 'http://127.0.0.1:8000/api';
   var jsonEnd = '?format=json';

   //FIX ME!!!
   apiService.getSearchResults = function(cuisines, courses){
     var defered = $q.defer();
     var req = {
          url: urlBase + '/search/' + jsonEnd,
          method: "GET",
          data: JSON.stringify({courses: courses, cuisines: cuisines}),
      };
      var onSuccess = function (response, status, headers, config){
        console.log(response.value[0])
        defered.resolve(response.value);
      };
      var onError = function (response, status, headers, config){
        defered.resolve(status);
      };
      $http(req).success(onSuccess).error(onError);
      return defered.promise;
   };

   apiService.getFoods = function(){
     return $http.get(urlBase + '/foods/' + jsonEnd);
   };

   apiService.getRecipes = function(){
     return $http.get(urlBase + '/recipes/' + jsonEnd);
   };

   apiService.getCourses = function(){
     return $http.get(urlBase + '/courses/' + jsonEnd);
   };

   apiService.getCuisines = function(){
     return $http.get(urlBase + '/cuisines/' + jsonEnd);
   };

   apiService.getPantry = function(){
     return $http.get(urlBase + '/pantry/' + jsonEnd);
   };

   apiService.deletePantryItem = function(food_name){
     return $http.delete(urlBase + '/pantry/delete', {params: {food_name: food_name}}); //FIX ME
   };

   apiService.addPantryItem = function(food_item){
     $http({
          url: urlBase + '/pantry/put' + jsonEnd,
          method: "POST",
          data: JSON.stringify({food_name: food_item}),
      }).success(function (status) {
              return status;
          }).error(function (status) {
              return status;
          });
   };

   apiService.getFavorites = function(){
     return $http.get(urlBase + '/favorites/' + jsonEnd);
   };

   apiService.deleteFavorite = function(recipe_name){
     return $http.delete(urlBase + '/favorites/delete', {params: {recipe_name: recipe_name}});
   };

   apiService.addFavorite = function(recipe_name){
     $http({
          url: urlBase + '/favorites/put' + jsonEnd,
          method: "POST",
          data: {recipe_name: recipe_name},
      }).success(function (status) {
              return status;
          }).error(function (status) {
              return status;
          });
   };
   return apiService;
 }]);
