'use strict';

angular
	.module('s2n.viewLogin', ['ngRoute', 's2n.services'])

	.config(['$routeProvider', function($routeProvider, $locationProvider) {
	    $routeProvider.when('/login', {
	        templateUrl: 'viewLogin/viewLogin.html',
	        controller: 'LoginController',
					controllerAs: 'vm'
	    });
	}])

	.controller('LoginController', ['$location', 'Authentication', '$scope', function($location, Authentication, $scope) {
		var vm = this;
		$scope.username = "";
    $scope.usernameChanged = 0;
		$scope.password = "";
    $scope.passwordChanged = 0;
		$scope.failedToLogin = false;
		vm.login = login;
		activate();

		function activate() {
			if(Authentication.authenticate()) {
				$location.path('/');
			}
		}

		function login() {
			Authentication.login($scope.username, $scope.password);
			$scope.failedToLogin = true;
		}

        $scope.unChanged = function(){
            $scope.usernameChanged = 1;
        }

        $scope.pwChanged = function() {
            $scope.passwordChanged = 1;
        }
	}]);
