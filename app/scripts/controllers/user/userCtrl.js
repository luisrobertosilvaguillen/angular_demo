(function (app) {
    'use strict';

    app.controller('userCtrl', userCtrl);
    userCtrl.$inject = ['$scope','$uibModal', '$location', '$rootScope', 'apiService','notificationService'];

  	function userCtrl($scope, $uibModal, $location, $rootScope, apiService, notificationService)
  	{
        $scope.users = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.openDeleteDialog = openDeleteDialog;
        $scope.search = search;
        $scope.clearSearch = clearSearch;

 		function search(page) {
            page = page || 1;
            var config = {
                params: {
                    page: page,
                    pageSize: 4,
                    filter: $scope.filterUers
                }
            };          
            apiService.get('/user', config)
            .then(function(response) {
                $scope.users = response.data.results;
                $scope.page = 1;
                if ($scope.filterUers && $scope.filterUers.length) {
                    notificationService.displayInfo(response.data.results.length + ' users found');
                }     
            })
            .catch(function(err) {
                notificationService.displayError(response.data);
            });                  
 		}

        function openDeleteDialog(user) {
            $scope.deletedUser =  user;
            $uibModal.open({
                templateUrl: 'views/user/deleteModal.html',
                controller: 'userdeleteCtrl',
                scope: $scope
            }).result.then(function () {
                clearSearch();
            }, function () {
            });
        }

        function clearSearch() {
            $scope.filterCustomers = '';
            search();
        }

        $scope.search();        
  	}
})(angular.module('nexchange')); 
// (function (app) {
//     'use strict';

//     app.controller('userCtrl', userCtrl);
//     userCtrl.$inject = ['$scope', '$location', '$rootScope', 'apiService','notificationService','NgTableParams'];

//   	function userCtrl($scope, $location, $rootScope, apiService, notificationService,NgTableParams)
//   	{
//         $scope.users = [];

// 		function loadUsers() {
//             apiService.get('/user/cashiers', null,
//             usersLoadCompleted,
//             usersLoadFailed);
//         }

//         function usersLoadCompleted(response) {
//             $scope.users = response.data.results;
//             $scope.UsersParams = new NgTableParams({}, { dataset: $scope.users});
//         }

//         function usersLoadFailed(response) {
//             notificationService.displayError(response.data);
//         }
//         loadUsers();
//   	}
// })(angular.module('nexchange')); 


