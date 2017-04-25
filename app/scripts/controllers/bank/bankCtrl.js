(function (app) {
    'use strict';

    app.controller('bankCtrl', bankCtrl);
    bankCtrl.$inject = ['$scope','$uibModal', '$location', '$rootScope', 'apiService','notificationService'];

  	function bankCtrl($scope, $uibModal, $location, $rootScope, apiService, notificationService)
  	{
        $scope.banks = [];
        $scope.page = 0;
        $scope.openDeleteDialog = openDeleteDialog;
        $scope.search = search;
        $scope.clearSearch = clearSearch;

 		function search(page) {
			page = page || 1;
            var config = {
                params: {
                    page: page,
                    pageSize: 4,
                    filter: $scope.filterBanks
                }
            }; 			
            apiService.get('/bank', config)
            .then(function(response) {
                $scope.banks = response.data.results;
                $scope.page = 1;
                if ($scope.filterBanks && $scope.filterBanks.length) {
                    notificationService.displayInfo(response.data.results.length + ' banks found');
                }     
            })
            .catch(function(err) {
                notificationService.displayError(response.data);
            });
 		}

        function openDeleteDialog(bank) {
            $scope.deletedBank =  bank;
            $uibModal.open({
                templateUrl: 'views/bank/deleteModal.html',
                controller: 'bankdeleteCtrl',
                scope: $scope
            }).result.then(function ($scope) {
                clearSearch();
            }, function () {
            });
        }

        function clearSearch() {
            $scope.filterBanks = '';
            search();
        }

        $scope.search();        
  	}
})(angular.module('nexchange')); 