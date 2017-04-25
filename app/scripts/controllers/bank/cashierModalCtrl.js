(function (app) {
    'use strict';

    app.controller('cashierModalCtrl', cashierModalCtrl);

    cashierModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apiService', 'notificationService'];

    function cashierModalCtrl($scope, $uibModalInstance, apiService, notificationService) {
        $scope.cancel = cancel;
        $scope.selec = selec;
        $scope.cashiers = [];

        function loadCashiers() {
            apiService.get('/user/cashiers', null)
            .then(function(response) {
                $scope.cashiers = response.data.results;
            })
            .catch(function(err) {
                notificationService.displayError(response.data);
            });              
        }

        function selec(cashier) {
            $uibModalInstance.close(cashier);            
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }    	

        loadCashiers();        
    }

})(angular.module('nexchange'));