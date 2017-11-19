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

	.controller('LoginController', ['$location', 'Authentication', function($location, Authentication) {
		var vm = this;

		vm.username = "";
		vm.password = "";

		vm.login = login;

		vm.validInput = true;

		activate();

		function activate() {
			if(Authentication.isAuthenticated()) {
				$location.path('/');
			}
		}

		function login() {
			Authentication.login(vm.username, vm.password);
		}

		vm.validateInput = function() {
			if(vm.username.length > 5 && vm.password.length > 5) {
				vm.validInput = false;
			} else {
				vm.validInput = true;
			}
		}
	}]);
