(function (app) {
    'use strict';

    app.controller('resetCtr', resetCtr);
    resetCtr.$inject = ['$scope', '$rootScope', '$location','$stateParams', 'notificationService', 'apiService'];

  	function resetCtr($scope, $rootScope, $location, $stateParams, notificationService, apiService)
  	{
   		  $rootScope.showSideBar = false;
        $scope.reset = reset;
        $scope.form = {};
        $scope.passwordValidator = passwordValidator;
        
        function reset() {
            apiService.post('/auth/reset/'+ $stateParams.token , $scope.form)
            .then(function(response) {
              notificationService.displaySuccess(response.data.message);
              $location.path('/login');
            })
            .catch(function(err) {
                notificationService.displayError(response.data.message || response.data.detail );
            });            
        }

        function passwordValidator(password) {

          if(!password){return;}
          
          if (password.length < 6) {
            return "El Password debe ser de al menos " + 6 + " caracteres";
          }

          if (!password.match(/[A-Z]/)) {
             return "El Password debe tener al menos una letra mayuscula";
          }

          if (!password.match(/[0-9]/)) {
             return "El Password debe tener al menos un número";
          }

          return true;
      }        
  	}
})(angular.module('nexchange'));   		