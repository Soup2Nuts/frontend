'use strict';

angular
	.module('s2n.viewLogin', ['ngRoute', 's2n.services', 'angular-storage'])

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
		$scope.password = "";
		vm.login = login;
		activate();

		function activate() {
			if(localStorage.currentUser && localStorage.currentUser.token) {
				$location.path('/');
			}
		}

		function login() {
			Authentication.login($scope.username, $scope.password);
		}

	}]);
