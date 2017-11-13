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

    .controller('RegisterController', ['$location', 'AuthFactory', function($location, AuthFactory) {
        var vm = this;

        vm.username = "";
        vm.password = "";
        
        vm.register = register;

        vm.validInput = true;

        activate();

        function activate() {
            if(AuthFactory.isAuthenticated()) {
                $location.path('/');
            }
        }

        function register() {
            AuthFactory.register(vm.username, vm.password);
        }

        vm.validateInput = function() {
            if(vm.username.length > 5 && vm.password.length > 5) {
                vm.validInput = false;
            } else {
                vm.validInput = true;
            }
        }
    }]);
