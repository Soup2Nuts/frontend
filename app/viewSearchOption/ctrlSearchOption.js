

var searchModule = angular.module('s2n.viewSearchOption',['ngRoute'])
    .config(['$routeProvider' ,function($routeProvider){
            $routeProvider.when('/viewSearchOption',{
                templateUrl:'/viewSearchOption/viewSearchOption.html',
                controller:'viewSearchOptionController'
            });
    }]);

var viewSearchOptionController = function($scope,coursesFactory,cuisinesFactory){

    
    $scope.name = ['micky'];
    function init(){
        $scope.cuisines = cuisinesFactory.getCuisines();
        $scope.courses = coursesFactory.getCourses();
    };

    init();
};

viewSearchOptionController.$inject = ['$scope','coursesFactory','cuisinesFactory'];

searchModule.controller('viewSearchOptionController',viewSearchOptionController);


(function(){
    var coursesFactory = function(){
        var courses = ['Starter','Main','Desserts','Sauce','Beverage','BreakFast','Dinner'];
        var factory = {};
        factory.getCourses = function(){
            return courses;
        };
        return factory;
    }

    angular.module('s2n.viewSearchOption').factory('coursesFactory',coursesFactory);
}());


(function(){
    var cuisinesFactory = function(){
        var cuisines = ['American','Chinese','Italian','Indian','Viatnamese','Japanese','Korean'];
        var factory = {};
        factory.getCuisines = function(){
            return cuisines;
        };
        return factory;
    }

    angular.module('s2n.viewSearchOption').factory('cuisinesFactory',cuisinesFactory);
}());
