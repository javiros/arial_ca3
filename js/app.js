angular.module('myApp', [
        'ngRoute',
        'myApp.controllers',
        'UserApp'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {templateUrl: 'login.html'})
            .when('/signup', {templateUrl: 'signup.html'})
            .when('/home', {templateUrl: 'home.html', controller: 'HomeCtrl'})
            .otherwise({redirectTo: '/home'});
    }])
    .run(function($rootScope,user) {

    });