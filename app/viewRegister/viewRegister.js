'use strict';

angular
    .module('s2n.viewRegister', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'viewRegister/viewRegister.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        });
    }])

    .controller('RegisterController', ['$location', '$scope', 'Authentication', function($location, $scope, Authentication) {
        var vm = this;

        vm.register = register;

        activate();

        function activate() {
            if(Authentication.isAuthenticated()) {
                $location.path('/');
            }
        }

        function register() {
            Authentication.register(vm.username, vm.password);
        }
}]);
