(function (app) {
    'use strict';

    app.controller('bankformCtrl', banknewCtrl);
    banknewCtrl.$inject = ['$scope', '$q','$uibModal','$state', '$location', '$rootScope', 'apiService', 'notificationService'];

  	function banknewCtrl($scope, $q, $uibModal, $state, $location, $rootScope, apiService, notificationService) {
        $scope.bankReg = {};
        $scope.banks = [];
        $scope.account_types = [];
        $scope.cashiersaccount = [];
        $scope.Register = Register;
        $scope.addcashier = addcashier;
        $scope.delecashier = delecashier;
        $scope.nroaccountValidator = nroaccountValidator;
        $scope.balanceaccountValidator = balanceaccountValidator;
        var deferred = $q.defer();
        var promise = deferred.promise;
        promise.then(function() {
            loadBanks();        
            loadAccount_types();
        })
        .then(function() {
            if($state.params.bank ==  null)
            {
                $scope.bankReg = {};
                $scope.newreg = true;
            }
            else
            {
                $scope.newreg = false;
                $scope.bankReg = $state.params.bank;
                $scope.bankReg.bank = $scope.bankReg.bank.id;
                $scope.bankReg.account_type = $scope.bankReg.account_type.id;
                $scope.cashiersaccount = $scope.bankReg.cashiers;
            }     
        });
        deferred.resolve();
 		function loadBanks() {
            apiService.get('/bank/type', null)
            .then(function(response) {
                $scope.banks = response.data.results;
                             
            })
            .catch(function(err) {
                notificationService.displayError(response.data);
            });            

        }

        function loadAccount_types() {
            apiService.get('/account_type', null)
            .then(function(response) {
                $scope.account_types = response.data.results;              
            })
            .catch(function(err) {
                notificationService.displayError(response.data);
            });             
        }

        function Register() {
           if ($scope.cashiersaccount.length)
            $scope.bankReg.cashiers = $scope.cashiersaccount.map(function(n, i){ return n.id; });
            if($scope.newreg)
            {
                apiService.post('/bank', $scope.bankReg)
                .then(function(response) {
                    aftersave (response);
                })
                .catch(function(err) {
                    errorsave (err);
                });     
            }
            else
            {
                apiService.put('/bank/'+$scope.bankReg.id, $scope.bankReg)
                .then(function(response) {
                    aftersave (response);
                })
                .catch(function(err) {
                    errorsave (err);
                });   
            }
        
        }
        function aftersave (response) {
            $scope.bankReg = {};
            notificationService.displaySuccess('Banco '+ ($scope.newreg ? 'Registrado' : 'Editado') +' Exitosamente');
            $location.path('/bank');
        }
        function errorsave (response) {
            if(response.data)
                angular.forEach(response.data, function(i, val) { notificationService.displayError(i) });
            
            if (response.status == '400')
                notificationService.displayError('Error '+ ($scope.newreg ? 'Registrando' : 'Editando') +' Banco');
            else
                notificationService.displayError(response.statusText);
        }        

        function addcashier () {
            $uibModal.open({
                templateUrl: 'views/bank/cashiersModal.html',
                controller: 'cashierModalCtrl'
            }).result.then(function ($cashier) {
               validar_cashier($cashier);
            }, function () {
            });
        }
        function balanceaccountValidator(balance) {

          if(!balance){return;}
          
          if (!balance.toString().match(/^[\-\+]?((([0-9]{1,3})([0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/)) {
             return "El Balance de Cuenta no es un decimal válido. Ej.: 10000.00";
          }

          return true;
      }         
        function nroaccountValidator(nrocta) {

          if(!nrocta){return;}
          
          if (nrocta.length < 10) {
            return "El Nro. de Cuenta debe ser de al menos " + 10 + " caracteres";
          }

          if (!nrocta.match(/^[\-\+]?\d+$/)) {
             return "El Nro. de Cuenta debe contener solo números";
          }

          return true;
      }         
        function delecashier (cashier) {
            $scope.objmodal = { title : 'Descartar Cajero', question : 'Desea descartar al cajero ' + cashier.username, lblno: 'No', lblyes: 'Si'};
            $uibModal.open({
                templateUrl: 'views/miscellaneous/confirmModal.html',
                controller: 'confirmCtrl',
                scope: $scope
            }).result.then(function () {
                angular.forEach($scope.cashiersaccount, function(i, val) 
                {
                    if(cashier.id == i.id)
                    {
                        $scope.cashiersaccount.splice(val, 1);
                    }
                }); 
            }, function () {
            });            
        }

        function validar_cashier(cashier) {
            var valid = true;
            angular.forEach($scope.cashiersaccount, function(i, val) 
            {
                if(cashier.id == i.id)
                {
                    notificationService.displayError("Ya fue asignado este cajero");
                    valid = false;
                }
            });
            if(valid)
                $scope.cashiersaccount.push(cashier);
        }

  	}
})(angular.module('nexchange'));    