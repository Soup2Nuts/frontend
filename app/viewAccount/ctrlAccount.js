'use strict';

angular.module('s2n.viewAccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'viewAccount/viewAccount.html',
    controller: 'ViewAccountCtrl'
  });
}])

.controller('ViewAccountCtrl', ['$scope', function($scope) {

        $scope.account = {
            "name": "Dora The Explorer",
            "email": "dora@noswiping.com",
            "confirmPassword": "",
            "changePassword": ""
        }

}]);