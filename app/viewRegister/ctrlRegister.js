'use strict';

angular
    .module('s2n.viewRegister', ['ngRoute', 's2n.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'viewRegister/viewRegister.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        });
    }])

    .controller('RegisterController', ['$location', 'Authentication', '$scope', function($location, Authentication, $scope) {
        var vm = this;

        $scope.username = "";
        $scope.usernameChanged = 0;
        $scope.password = "";
        $scope.passwordChanged = 0;

        $scope.failedToRegister = false;

        vm.register = register;
        activate();

        function activate() {
    			if(Authentication.authenticate()) {
    				$location.path('/');
    			}
    		}

        function register() {
          Authentication.register($scope.username, $scope.password);
          $scope.failedToRegister = true;
        }

        $scope.unChanged = function(){
            $scope.usernameChanged = 1;
        }

        $scope.pwChanged = function() {
            $scope.passwordChanged = 1;
        }
    }]);
