(function (app) {
    'use strict';

    app.controller('activationCtrl', activationCtrl);
    activationCtrl.$inject = ['$scope', '$location', '$stateParams', '$rootScope', 'apiService'];
  	function activationCtrl($scope, $location, $stateParams, $rootScope, apiService)
  	{
  		$scope.token = $stateParams.token;
		  $rootScope.showSideBar = false;
      function verifyToken() {
          apiService.get('/auth/activation/'+ $scope.token , null)
          .then(function(response) {
              $scope.is_valid = response.data.verified;   
          })
          .catch(function(err) {
              $scope.is_valid = false;
          });
      }
      verifyToken();             		 
  	}
})(angular.module('nexchange'));   		