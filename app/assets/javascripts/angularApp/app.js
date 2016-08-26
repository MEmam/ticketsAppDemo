var ticketApp = angular.module('ticketApp', [
  'appControllers',
  'appFactories',
  'ngRoute',
  'ngResource',
  'ng-token-auth',
  'ui.bootstrap',
  'ipCookie',
  'angularModalService'
]);

var appControllers = angular.module('appControllers', []);
var appFactories = angular.module('appFactories', ['ngResource']);


ticketApp.config(function($routeProvider, $authProvider) {

  $authProvider.configure({
      apiUrl: ''
    });

  $routeProvider
    .when("/", {
        templateUrl : "views/requests/requests.htm",
        controller: 'RequestCtrl',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
    })
    .when("/users", {
        templateUrl : "views/users/users.htm",
        controller: 'UserCtrl',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
    });

    $routeProvider.otherwise('/');
});
