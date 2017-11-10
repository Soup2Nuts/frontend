'use strict';

angular
	.module('s2n.viewLogin', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider, $locationProvider) {
	    $routeProvider.when('/login', {
	        templateUrl: 'viewLogin/viewLogin.html',
	        controller: 'LoginController',
			controllerAs: 'vm'
	    });
	}])

	.controller('LoginController', ['$location', 'Authentication', function($location , Authentication) {
		var vm = this;

		vm.login = login;

		activate();

		function activate() {
			if(Authentication.isAuthenticated()) {
				$location.path('/');
			}
		}

		function login() {
			Authentication.login(vm.username, vm.password);
		}
	}]);