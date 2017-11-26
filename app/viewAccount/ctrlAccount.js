'use strict';

angular.module('s2n.viewAccount', ['ngRoute', 's2n.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', ['$scope','$localStorage', 'Authentication', function($scope, $localStorage,Authentication) {

        console.log($localStorage.token)

        $scope.invalidpw = true;

        $scope.auth = Authentication.authenticate();
        Authentication.authorizeMe();

        Authentication.updatePassword("marinara123","spaghetti123");

        console.log($scope.auth);

        $scope.account = {
            "name": "Dora The Explorer",
            "confirmPassword": "",
            "changePassword": ""
        };

        $scope.validatepw = function () {
            if ($scope.account.confirmPassword == $scope.account.changePassword &&
                $scope.account.confirmPassword.length >= 8
            ) {
                $scope.invalidpw = false;
            } else {
                $scope.invalidpw = true;
            }
        };

}]);
