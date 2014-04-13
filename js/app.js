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




UserApp.initialize({ appId: "5349161769376" });

function signup() {
    UserApp.User.save({
        login: document.getElementById("email").value,
        first_name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }, function(error, user) {
    if (error) {
    alert("Error: " + error.message);
    } else {
    alert("Thanks for signing up!");
    }
});

return false;
}
