(function () {
    'use strict';

    angular.module('nexchange', ['common.core', 'common.ui'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'views/home/index.html',
                controller: 'indexCtrl',
                authenticate: false
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/account/login.html',
                controller: 'loginCtrl',
                authenticate: false
            })
            .state('activation', {
                url: '/activation/:token',
                templateUrl: 'views/account/activation.html',
                controller: 'activationCtrl',
                authenticate: false
            })     
            .state('recovery', {
                url: '/recovery',
                templateUrl: 'views/account/recovery.html',
                controller: 'recoveryCtrl',
                authenticate: false
            })        
            .state('reset', {
                url: '/reset/:token',
                templateUrl: 'views/account/reset.html',
                controller: 'resetCtr',
                authenticate: false
            })                                 
            .state('user', {
                url: '/user',
                templateUrl: 'views/user/index.html',
                controller: 'userCtrl',
                authenticate: true
            })
            .state('user-new', {
                url: '/user/new',
                templateUrl: 'views/user/form.html',
                controller: 'userformCtrl',
                params: {
                     user: null
                },                
                authenticate: true
            })
            .state('user-edit', {
                url: '/user/edit',
                templateUrl: 'views/user/form.html',
                controller: 'userformCtrl',
                params: {
                     user: null
                },                
                authenticate: true
            })
            .state('bank', {
                url: '/bank',
                templateUrl: 'views/bank/index.html',
                controller: 'bankCtrl',
                authenticate: true
            })
            .state('bank-new', {
                url: '/bank/new',
                templateUrl: 'views/bank/form.html',
                controller: 'bankformCtrl',
                params: {
                     bank: null
                },                
                authenticate: true
            })
            .state('bank-edit', {
                url: '/bank/edit',
                templateUrl: 'views/bank/form.html',
                controller: 'bankformCtrl',
                params: {
                     bank: null
                },                
                authenticate: true
            })
            ;                         
    }

    run.$inject = ['membershipService', '$state', '$rootScope', '$location', '$cookieStore', '$http'];

    function run(membershipService, $state, $rootScope, $location, $cookieStore, $http) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (toState.authenticate && !membershipService.isUserLoggedIn()) {
                $rootScope.previousState = $location.path();
                $state.transitionTo("login");
                event.preventDefault(); 
            }            
            $rootScope.showSideBar = true;  
        });
      
        $rootScope.repository = $cookieStore.get('repository') || {};
        if ($rootScope.repository.loggedUser) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.repository.loggedUser.authdata;
        }
    }

})();