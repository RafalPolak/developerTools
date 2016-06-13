var webApp = angular.module('webApp',[
//internal lib
	'startController',
	'projektController',
//external lib
	'ngRoute',
	'ngAnimate',
	'ui.bootstrap'
]);

webApp.config(function($routeProvider,$locationProvider) {

	//configure for html5
	//$locationProvider.html5Mode(true);

	$routeProvider.
		when('/start', {
			templateUrl: 'templates/start.html',
			controller: 'startCtrl'
		}).
		when('/projekt1', {
			templateUrl: 'templates/projekt1.html',
			controller: 'projektCtrl'
		}).
		when('/projekt2', {
			templateUrl: 'templates/projekt2.html',
			controller: 'projektCtrl'
		}).
		when('/projekt3', {
			templateUrl: 'templates/projekt3.html',
			controller: 'projektCtrl'
		}).


		otherwise({ redirectTo: '/start' });
});