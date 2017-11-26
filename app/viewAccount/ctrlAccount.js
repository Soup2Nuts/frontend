'use strict';

angular.module('s2n.viewAccount', ['ngRoute', 's2n.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', ['$scope', 'Authentication', function($scope, Authentication) {

        $scope.invalidpw = true;

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
