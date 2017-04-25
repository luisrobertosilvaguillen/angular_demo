(function (app) {
    'use strict';

    app.controller('bankdeleteCtrl', bankdeleteCtrl);

    bankdeleteCtrl.$inject = ['$scope', '$uibModalInstance', 'apiService', 'notificationService'];

    function bankdeleteCtrl($scope, $uibModalInstance, apiService, notificationService) {
        $scope.cancelDelete = cancelDelete;
        $scope.deleteBank = deleteBank;

        function deleteBank() {
            apiService.delet('/bank/' + $scope.deletedBank.id)
            .then(function(response) {
                notificationService.displaySuccess($scope.deletedBank.bank.bank + ' - ' + $scope.deletedBank.account_type.type + ' ha sido eliminado');
                $scope.deletedBank = {};
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