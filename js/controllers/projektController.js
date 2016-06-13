var aktualnosci = angular.module('projektController', []);


aktualnosci
	.controller('projektCtrl', ['$scope', function ($scope) {
		
		$scope.releases = ["Release 2.19.0","Release 2.18.0","Release 2.17.0"];

		$scope.current = 0;

		console.log($scope.test);

		$scope.today = function() {
    		$scope.dtStart = new Date();
    		$scope.dtEnd = new Date();
  		};

  		$scope.today();

  		$scope.popup1 = {
    		opened: false
  		};

  		$scope.popup2 = {
    		opened: false
  		};

		$scope.openStartDate = function() {
    		$scope.popup1.opened = true;
  		};

  		$scope.openEndDate = function() {
    		$scope.popup2.opened = true;
  		};


	}]);