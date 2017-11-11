'use strict';

angular.module('s2n.viewSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: ' viewSearch/viewSearch.html',
    controller: 'MockController'
  });
}])
.controller('searchCtrl', [function() {

}]);

var myapp = angular.module('s2n.viewSearch');
console.log("hey  ");
myapp.controller('MockController',['$scope','$http',function($s,$h){
  //console.log("here i am");
  var myctrl = this
  myctrl.data = {}
  
  
  myctrl.load_data = function(){
    $h.get("/viewSearch/dummy_ingredient.json").success(function(data){
      myctrl.data = data;
      $s.ingredients = myctrl.data;
      console.log(myctrl.data);
    }).error(function(){
      alert("Unable to Load Mock Data");
    });
  };
  myctrl.load_data();

}]);

