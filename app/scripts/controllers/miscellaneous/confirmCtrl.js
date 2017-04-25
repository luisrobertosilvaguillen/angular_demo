(function (app) {
    'use strict';

    app.controller('confirmCtrl', confirmCtrl);

    confirmCtrl.$inject = ['$scope', '$uibModalInstance'];

    function confirmCtrl($scope, $uibModalInstance) {
        $scope.cancel = cancel;
        $scope.acept = acept;

        function acept() {
            $uibModalInstance.close();
        }    	

        function cancel() {
            $uibModalInstance.dismiss();
        }    	
    }

})(angular.module('nexchange'));