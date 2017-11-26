'use strict';

angular.module('s2n.viewAccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', ['$scope', function($scope) {

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
