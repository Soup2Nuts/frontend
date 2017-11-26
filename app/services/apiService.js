'use strict';
angular.module('s2n.apiService', ['ngStorage'])

    .factory('apiService', ['$http', '$localStorage', '$location',
        function ($http, $localStorage, $location) {
            var apiService = {};

            //var urlBase = 'http://soup2nuts.us:90';
            var urlBase = 'http://127.0.0.1:8000/api';
            var jsonEnd = '?format=json';

            apiService.getSearchResults = function (cuisines, courses) {
                var req = {
                    url: urlBase + '/search',
                    method: "GET",
                    params: {courses: courses, cuisines: cuisines}
                };
                var onSuccess = function (response) {
                    return response;
                };
                var onError = function (response) {
                    if (response.status == 403 || response.status == 401) {
                        console.log("User was not logged in");
                        $location.path('/login');
                    }
                    return response.status;
                };
                var promise = $http(req).success(onSuccess).error(onError);
                return promise;
            };

            apiService.getFoods = function () {
                return $http.get(urlBase + '/foods/' + jsonEnd);
            };

            apiService.getRecipes = function () {
                return $http.get(urlBase + '/recipes/' + jsonEnd);
            };

            apiService.getCourses = function () {
                return $http.get(urlBase + '/courses/' + jsonEnd);
            };

            apiService.getCuisines = function () {
                return $http.get(urlBase + '/cuisines/' + jsonEnd);
            };

            //this will authenticate the current users token to see if they're logged in
            //if they're not it'll redirect to the login screen, if they are, carry on.
            apiService.getPantry = function () {
                var promise = $http.get(urlBase + '/pantry/' + jsonEnd).
                    then(function (response) {
                        return response;
                    }, function errorCallback(response) {
                        if (response.status == 403 || response.status == 401) {
                            console.log("User was not logged in");
                            $location.path('/login');
                        }
                        return response.status;
                    });

                return promise;
            };

            apiService.deletePantryItem = function (food_name) {
                var promise = $http.delete(urlBase + '/pantry/delete', {params: {food_name: food_name}}).
                    then(function (response) {
                        return response;
                    }, function errorCallback(response) {
                        if (response.status == 403 || response.status == 401) {
                            console.log("User was not logged in");
                            $location.path('/login');
                        }
                        return response.status;
                    });
                return promise;
            };

            apiService.addPantryItem = function (food_item) {
                $http({
                    url: urlBase + '/pantry/put' + jsonEnd,
                    method: "POST",
                    data: JSON.stringify({food_name: food_item})
                }).success(function (status) {
                    return status;
                }).error(function (status) {
                    if (status == 403 || status == 401) {
                        console.log("User was not logged in");
                        $location.path('/login');
                    }
                    return status;
                });
            };

            apiService.getFavorites = function () {
                var promise = $http.get(urlBase + '/favorites/' + jsonEnd).
                    then(function (response) {
                        return response;
                    }, function errorCallback(response) {
                        if (response.status == 403 || response.status == 401) {
                            console.log("User was not logged in");
                            $location.path('/login');
                        }
                        return response.status;
                    });

                return promise;

            };

            apiService.deleteFavorite = function (recipe_name) {
                //return $http.delete(urlBase + '/favorites/delete', {params: {recipe_name: recipe_name}});
                var promise = $http.delete(urlBase + '/favorites/delete', {params: {recipe_name: recipe_name}}).
                    then(function (response) {
                        return response;
                    }, function errorCallback(response) {
                        if (response.status = 403 || response.status == 401) {
                            console.log("User was not logged in");
                            $location.path('/login');
                        }
                        return response.status;
                    });

                return promise;
            };

            apiService.addFavorite = function (recipe_name) {
                $http({
                    url: urlBase + '/favorites/put' + jsonEnd,
                    method: "POST",
                    data: {recipe_name: recipe_name}
                }).success(function (status) {
                    return status;
                }).error(function (response) {
                    if (response.status = 403 || response.status == 401) {
                        console.log("User was not logged in");
                        $location.path('/login');
                    }
                    return response.status;
                });
            };
            return apiService;
        }]);
