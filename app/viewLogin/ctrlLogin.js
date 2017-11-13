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

	.controller('LoginController', ['$location', 'AuthFactory', function(AuthFactory, $location) {
		var vm = this;

		vm.login = login;

		activate();

		function activate() {
			if(AuthFactory.isAuthenticated()) {
				$location.path('/');
			}
		}

		function login() {
			AuthFactory.login(vm.username, vm.password);
		}
	}]);