(function () {
  'use strict';

  angular
    .module('s2n.services', ['ngRoute', 'ngCookies'])
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http', '$location'];

  function Authentication($cookies, $http, $location) {
	var urlBase = 'http://127.0.0.1:8000/auth';

    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      register: register,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate
    };

    function login(username, password) {
      return $http.post(urlBase +'/token/create/', {
        username: username, password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(response) {
        var token = response.headers().auth_token
        $http.defaults.headers.common['Authorization'] = 'Token ' + token;
        // Authentication.setAuthenticatedAccount(token);
        $cookies.authenticatedAccount = data.auth_token;
        $location.path('/');
      }

      function loginErrorFn(response) {
        $location.path('/login');
      }
    }

      function getAuthenticatedAccount() {
        if (!$cookies.authenticatedAccount) {
          return;
        }

        return JSON.parse($cookies.authenticatedAccount);
      }

      function isAuthenticated() {
        return !!$cookies.authenticatedAccount;
      }

      function setAuthenticatedAccount(token) {
        $cookies.authenticatedAccount = token;
      }

      function unauthenticate() {
        delete $cookies.authenticatedAccount;
      }

        function logout() {
            return $http.post(urlBase + '/token/destroy/') //TODO add this
                .then(logoutSuccessFn, logoutFailureFn);

            function logoutSuccessFn(data, status, headers, config) {
                AuthFactory.unauthenticate();
                $location.path('/home/');
            }

            function logoutFailureFn(data, status, headers, config) {
                console.error('Logout Failed... ?')
            }
        }
    return Authentication;

    ////////////////////

    function register(email, password, username) {
      return $http.post(baseUrl+'/users/create/', {
        username: username,
        password: password,
      }).then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(username, password);
      }

      function registerErrorFn(data, status, headers, config) {
        console.error('Failed to register user');
      }
    }
  }
})();
