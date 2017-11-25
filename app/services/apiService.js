'use strict';
 angular.module('s2n.apiService', ['ngStorage'])

 .factory('apiService', ['$http', '$localStorage', '$location',
         function($http, $localStorage, $location){
   var apiService = {};

   //var urlBase = 'http://soup2nuts.us:90';
   var urlBase = 'http://127.0.0.1:8000/api';
   var jsonEnd = '?format=json';

   //TODO!!!!!!!
   apiService.getSearchResults = function(courses, cuisines){
     return courses; //Replace this when endpoint is setup
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

         //this will authenticate the current users token to see if they're logged in
         //if they're not it'll redirect to the login screen, if they are, carry on.
   apiService.getPantry = function(){
       var promise = $http.get(urlBase + '/pantry/' + jsonEnd).
           then(function(response){
                return response;
           }, function errorCallback(response){
                console.log("User was not logged in");
               $location.path('/login');
            });

       return promise;
   };

   apiService.deletePantryItem = function(food_name){
     return $http.delete(urlBase + '/pantry/delete', {params: {food_name: food_name}}); //FIX ME
   };

   apiService.addPantryItem = function(food_item){
     $http({
          url: urlBase + '/pantry/put' + jsonEnd,
          method: "POST",
          data: JSON.stringify({food_name: food_item})
      }).success(function (status) {
              return status;
          }).error(function (status) {
              return status;
          });
   };

   apiService.getFavorites = function(){
       var promise = $http.get(urlBase + '/favorites/' + jsonEnd).
           then(function(response){
               return response;
           }, function errorCallback(response){
               console.log("User was not logged in");
               $location.path('/login');
           });

       return promise;

   };

   apiService.deleteFavorite = function(recipe_name){
     return $http.delete(urlBase + '/favorites/delete', {params: {recipe_name: recipe_name}});
   };

   apiService.addFavorite = function(recipe_name){
     $http({
          url: urlBase + '/favorites/put' + jsonEnd,
          method: "POST",
          data: {recipe_name: recipe_name}
      }).success(function (status) {
              return status;
          }).error(function (status) {
              return status;
          });
   };

   return apiService;
 }]);
