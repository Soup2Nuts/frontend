'use strict';

angular.module('s2n.viewAccount', ['ngRoute', 's2n.services', 'angular-jwt', 'ngStorage'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', ['$scope', 'Authentication', 'jwtHelper', '$localStorage', function($scope, Authentication, jwtHelper, $localStorage) {

        $scope.failedToChangePw = false;
        $scope.account = {
            "name": "Dora The Explorer",
            "confirmPassword": "",
            "changePassword": "",
            "currentPassword": ""
        };
        $scope.account.name = jwtHelper.decodeToken($localStorage.token).username;

        $scope.changePassword = function(){
          var onSuccess = function (response) {
              $scope.failedToChangePw = false;
              $scope.account.confirmPassword = "";
              $scope.account.currentPassword = "";
              $scope.account.changePassword = "";
          };
          var onError = function (response) {
              $scope.failedToChangePw = true;
          };
          Authentication.setPassword($scope.account.changePassword, $scope.account.currentPassword).success(onSuccess).error(onError);
        }


}]);
