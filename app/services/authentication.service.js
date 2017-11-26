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
        authenticate: authenticate
    };

    function login(username, password) {
        return $http.post(urlBase + '/jwt/create/', {
            username: username, password: password
        }).then(loginSuccessFn, loginErrorFn);

        function loginSuccessFn(response) {
            if (response) {
                // store username and token in local storage to keep user logged in between page refreshes
                //store.storage.set('sessionData', {'username': username, 'token': response.data.token});
                console.log('login success');
                $localStorage.token = response.data.token;
                $localStorage.username = username;
                console.log($localStorage.token);
                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                $location.path('/pantry');
            }
            else { // response did not have token
                console.log('login failed');
                loginErrorFn(response)
            }
        }

        function loginErrorFn(response) {
            $location.path('/login');
            console.error('Failed to login user ' + response);
        }
    }

    function updatePassword(new_pass,prev_pass){
        return $http.post(urlBase + '/auth/password/', {
            new_password: new_pass, current_password: prev_pass
        }).then(updateSuccess, updateFailure);

        function updateSuccess(response) {
            if (response) {
                console.log('password udpated success');
                $location.path('/account');
            }
            else { 
                console.log('Update Failed');
                updateFailure(response)
            }
        }
        function updateFailure(response) {
            $location.path('/account');
            console.error('Failed to update password ' + response);
        }

    }

    function authenticate() {
        if ($localStorage.token && $localStorage.token === $http.post(urlBase + '/jwt/verify/', {token: $localStorage.token})) {
            return true;
        }
        //If there is not a token stored or the token is not valid, send the user to the login page
        $localStorage.$reset();
        $http.defaults.headers.common.Authorization = '';
        return false;
    }

    function logout() {
        if (authenticate()) {
            $localStorage.$reset();
        }
        $http.defaults.headers.common.Authorization = '';
        $location.path('/about');
    }

    function register(username, password) {
        console.log('authenticate');
        return $http.post(urlBase + '/users/create/', {
            email: username + '@TEMP.com',
            username: username,
            password: password
        }).then(registerSuccessFn, registerErrorFn);
        function registerSuccessFn(response) {
            console.log('authentication SUCCESS');
            Authentication.login(username, password);
        }

        function registerErrorFn(response) {
            console.log(response);
            return false;
        }
    }
    return Authentication;
}
