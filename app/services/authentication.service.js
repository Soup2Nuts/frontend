// (function () {
  'use strict';

  angular
    .module('s2n.services', ['ngRoute', 'angular-storage'])
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$http', '$location', 'localStorage'];

  function Authentication($http, $location, localStorage){
	  var urlBase = 'http://127.0.0.1:8000/auth';
    var Authentication = {
      logout: logout,
      login: login,
      register: register,
    };
    function login(username, password) {
      return $http.post(urlBase +'/jwt/create/', {
        username: username, password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(response) {
        if (response) {
          // store username and token in local storage to keep user logged in between page refreshes
          localStorage.currentUser = {username: username, token: response};
          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.common.Authorization = 'Bearer ' + response;
          $location.path('/pantry');
        }
        else { // response did not have token
            loginErrorFn(response)
        }
      }
      function loginErrorFn(response) {
        $location.path('/login');
        console.error('Failed to login user ' + response);
      }
    }
    function logout() {
      if(localStorage){
        localStorage.currentUser = undefined;
      }
      $http.defaults.headers.common.Authorization = '';
      $location.path('/about');
    }
    function register(username, password){
      return $http.post(urlBase +'/users/create/', {
        email: username + '@TEMP.com',
        username: username,
        password: password,
      }).then(registerSuccessFn, registerErrorFn);
      function registerSuccessFn(response) {
        Authentication.login(username, password);
      }
      function registerErrorFn(response) {
        console.error('Failed to register user');
      }
    }
    return Authentication;
  }
// })();
