(function (app) {
    'use strict';

    app.controller('userdeleteCtrl', userdeleteCtrl);

    userdeleteCtrl.$inject = ['$scope', '$uibModalInstance', 'apiService', 'notificationService'];

    function userdeleteCtrl($scope, $uibModalInstance, apiService, notificationService) {
        $scope.cancelDelete = cancelDelete;
        $scope.deleteUser = deleteUser;

        function deleteUser() {
			apiService.delet('/user/' + $scope.deletedUser.id)
            .then(function(response) {
                notificationService.displaySuccess($scope.deletedUser.fullname + ' ha sido eliminado');
                $scope.deletedUser = {};
                $uibModalInstance.close();
            })
            .catch(function(err) {
                notificationService.displayError(response.data);
            });               	
        }    	

        function cancelDelete() {
            $uibModalInstance.dismiss();
        }    	
    }

})(angular.module('nexchange'));