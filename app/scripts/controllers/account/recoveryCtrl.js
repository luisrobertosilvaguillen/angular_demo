(function (app) {
    'use strict';

    app.controller('recoveryCtrl', recoveryCtrl);
    recoveryCtrl.$inject = ['$scope', '$rootScope', '$location', 'notificationService', 'apiService'];

  	function recoveryCtrl($scope, $rootScope, $location, notificationService, apiService)
  	{
   		  $rootScope.showSideBar = false;
        $scope.recovery = recovery;
        $scope.data = {};

        function recovery() {
            apiService.post('/auth/recovery' , $scope.data)
            .then(function(response) {
                notificationService.displaySuccess(response.data.message);
                $location.path('/login');
            })
            .catch(function(err) {
                notificationService.displayError(response.data.message || response.data.detail );
            });                
        }
  	}
})(angular.module('nexchange'));   		