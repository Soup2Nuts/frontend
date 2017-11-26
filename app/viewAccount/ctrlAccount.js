'use strict';

angular.module('s2n.viewAccount', ['ngRoute', 's2n.services', 'angular-jwt', 'ngStorage'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', ['$scope', 'Authentication', 'jwtHelper', '$localStorage', function($scope, Authentication, jwtHelper, $localStorage) {

        $scope.invalidpw = true;

        $scope.account = {
            "name": "Dora The Explorer",
            "confirmPassword": "",
            "changePassword": "",
            "currentPassword": ""
        };
        $scope.account.name = jwtHelper.decodeToken($localStorage.token).username;

        $scope.validatepw = function () {
            if ($scope.account.confirmPassword == $scope.account.changePassword &&
                $scope.account.confirmPassword.length >= 8
            ) {
                $scope.invalidpw = false;
            } else {
                $scope.invalidpw = true;
            }
        };

        $scope.changePassword = function(){
          Authentication.setPassword($scope.account.changePassword, $scope.account.currentPassword);
        }


}]);
