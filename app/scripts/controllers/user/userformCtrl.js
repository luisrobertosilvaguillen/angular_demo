(function (app) {
    'use strict';

    app.controller('userformCtrl', userformCtrl);
    userformCtrl.$inject = ['$scope', '$q', '$state','$location', '$rootScope', 'apiService', 'notificationService'];

  	function userformCtrl($scope, $q, $state, $location, $rootScope, apiService, notificationService) {
        $scope.userReg = {};
        $scope.groups = [];
        $scope.Register = Register;

 		function loadGroups() {
            apiService.get('/groups', null)
            .then(function(response) {
                $scope.groups = response.data.results;
            })
            .catch(function(err) {
                notificationService.displayError(response.data);
            });              
        }

        var deferred = $q.defer();
        var promise = deferred.promise;
        promise.then(function() {
            loadGroups(); 
        })
        .then(function() {
            if($state.params.user ==  null)
            {
                $scope.userReg = {};
                $scope.newreg = true;
            }
            else
            {
                $scope.newreg = false;
                $scope.userReg = $state.params.user;
                $scope.userReg.group = $scope.userReg.group.id;
            }     
        });
        deferred.resolve();

        function Register() {
            if($scope.newreg)
            {
                apiService.post('/user', $scope.userReg)
                .then(function(response) {
                    aftersave (response);
                })
                .catch(function(err) {
                    errorsave (err);
                });     
            }
            else
            {
                apiService.put('/user/'+$scope.userReg.id, $scope.userReg)
                .then(function(response) {
                    aftersave (response);
                })
                .catch(function(err) {
                    errorsave (err);
                });   
            }           
        }
        function aftersave(response) {
            $scope.userReg = {};
            notificationService.displaySuccess('Usuario '+ ($scope.newreg ? 'Registrado' : 'Editado') +' Exitosamente');
            $location.path('/user');
        }

        function errorsave(response) {
        	if(response.data)
        		angular.forEach(response.data, function(i, val) { notificationService.displayError(i) });
            
            if (response.status == '400')
            	notificationService.displayError('Error '+ ($scope.newreg ? 'Registrando' : 'Editando') +' Usuario');
            else
                notificationService.displayError(response.statusText);
        }               

               
  	}
})(angular.module('nexchange'));    

