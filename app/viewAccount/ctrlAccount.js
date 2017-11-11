'use strict';

angular.module('s2n.viewAccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', ['$scope', function($scope) {

        $scope.validpw = true;

        $scope.account = {
            "name": "Dora The Explorer",
            "email": "dora@noswiping.com",
            "confirmPassword": "",
            "changePassword": ""
        }

        $scope.validatepw = function () {
            if ($scope.account.confirmPassword == $scope.account.changePassword &&
                $scope.account.confirmPassword.length > 5
            ) {
                $scope.validpw = false;
            } else {
                $scope.validpw = true;
            }
        }

}]);