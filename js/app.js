var app = angular.module('arial_ca3', [
        'ngRoute',
        'arial_ca3.controllers',
        'UserApp'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {templateUrl: 'login.html', public:true, login:true})
            .when('/signup', {templateUrl: 'signup.html',public:true})
            .when('/dashboard', {templateUrl: 'dashboard.html', controller: 'dashboardCtrl'})
            .otherwise({redirectTo: '/dashboard'});
    }])
    .run(function($rootScope,user) {
        user.init({ appId: '5349161769376' });
    });