var headersController = angular.module('headersCtrl', []);

headersController
	.controller('indexHeadersCtrl', ['$scope','$location', function ($scope, $location) {
		$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    	};
}]);