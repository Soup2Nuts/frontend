(function () {
  'use strict';

  angular
    .module('s2n.services', ['ngRoute', 'angular-storage'])
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$http', '$location', 'localStorage'];

  function Authentication($http, $location, localStorage) {
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
        if (response.token) {
          // store username and token in local storage to keep user logged in between page refreshes
          localStorage.currentUser = { username: username, token: response.token };
          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
          $location.path('/pantry');
        }
        else {
            $location.path('/login');
        }
      }
      function loginErrorFn(response) {
        $location.path('/login');
      }
    }
    function logout() {
      if(localStorage.currentUser)
        localStorage.currentUser.removeItem("username")
      $http.defaults.headers.common.Authorization = '';
      $location.path('/about');
    }
    return Authentication;

    ////////////////////

    function register(email, password, username) {
      return $http.post(baseUrl+'/users/create/', {
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
  }
})();
