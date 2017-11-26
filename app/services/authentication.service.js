'use strict';

angular
    .module('s2n.services', ['ngRoute', 'ngStorage'])
    .factory('Authentication', Authentication);

Authentication.$inject = ['$http', '$location', '$localStorage'];

function Authentication($http, $location, $localStorage) {
    var urlBase = 'http://127.0.0.1:8000/auth';

    var Authentication = {
        logout: logout,
        login: login,
        register: register,
        authenticate: authenticate,
        updatePassword : updatePassword,
        authorizeMe : authorizeMe
    };

    function login(username, password) {
        return $http.post(urlBase + '/jwt/create/', {
            username: username, password: password
        }).then(loginSuccessFn, loginErrorFn);

        function loginSuccessFn(response) {
            if (response) {
                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.token = response.data.token;
                $localStorage.username = username;
                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                $location.path('/pantry');
            }
            else {
                // response did not have token
                loginErrorFn(response);
            }
        }

        function loginErrorFn(response) {
            $location.path('/login');
            console.error('Failed to login user ' + response);
        }
    }

    function authenticate() {
      if ($localStorage.token){
        var req = {
            url: urlBase + '/jwt/verify/',
            method: "POST",
            data: {token: $localStorage.token}
        };
        var onSuccess = function (response) {
            //The token is valid
            return response.data.token === $localStorage.token;
        };
        var onError = function (response) {
          //The token was invalid or expired
          $localStorage.$reset();
          $http.defaults.headers.common.Authorization = '';
          return false;
        };
        return $http.post(urlBase + '/jwt/verify/', {token: $localStorage.token}).then(onSuccess, onError);
      }
      //There is not a token stored
      $localStorage.$reset();
      $http.defaults.headers.common.Authorization = '';
      return false;
    }

    function logout() {
        $localStorage.$reset();
        $http.defaults.headers.common.Authorization = '';
        $location.path('/about');
    }

    function register(username, password) {
        return $http.post(urlBase + '/users/create/', {
            email: username + '@TEMP.com',
            username: username,
            password: password
        }).then(registerSuccessFn, registerErrorFn);
        function registerSuccessFn(response) {
            Authentication.login(username, password);
        }

        function registerErrorFn(response) {
            console.log(response);
            return false;
        }
    }

    function authorizeMe(){
        console.log('try to authorize you ');
        return $http.post(urlBase + '/me/' , {"token":$localStorage.token}).then(success, failure);
        function success(response) {
            console.log('success');
        }

        function failure(response) {
            console.log(response);
            return false;
        }
    }

    function updatePassword(old_p,new_p){
        console.log(old_p,new_p);
        return $http.post(urlBase + '/password/', {
            "new_password": new_p,
            "current_password": old_p,
            "token":$localStorage.token
        } ).then(success, failure);
        function success(response) {
            console.log('success');
        }

        function failure(response) {
            console.log(response);
            return false;
        }
    }
    return Authentication;
}
