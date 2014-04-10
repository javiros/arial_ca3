angular.module('arial_ca3', [
        'ngRoute',
        'arial_ca3.controllers',
        'UserApp'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {templateUrl: 'login.html'})
            .when('/signup', {templateUrl: 'signup.html'})
            .when('/dashboard', {templateUrl: 'dashboard.html', controller: 'dashboardCtrl'})
            .otherwise({redirectTo: '/home'});
    }])
    .run(function($rootScope,user) {

    });