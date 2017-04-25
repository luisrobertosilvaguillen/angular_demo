(function (app) {
    'use strict';

    app.factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', '$location', 'notificationService','$rootScope'];

    function apiService($http, $q, $location, notificationService, $rootScope) {
        var service = {
            get: get,
            post: post,
            put: put,
            delet: delet
        };
        function resolve_api_uri(uri_action)
        {
            // var api_domain = "http://127.0.0.1:8000";
            var api_domain = "https://negociosexchange.herokuapp.com";
            return api_domain + uri_action;
        }
        function get(url, config) {
            var defered = $q.defer();
            var promise = defered.promise;            
            $http.get(resolve_api_uri(url), config)
                    .then(function (result) {
                        defered.resolve(result);
                    }, function (error) {
                        if (error.status == '401') {
                            notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else{
                            defered.reject(error);
                        }
                    });
            return promise;
        }

        function post(url, data) {
            var defered = $q.defer();
            var promise = defered.promise;             
            $http.post(resolve_api_uri(url), data)
                    .then(function (result) {
                        defered.resolve(result);
                    }, function (error) {
                        if (error.status == '401') {
                            var msj = error.data.error_description ? error.data.error_description : 'Authentication required.';
                            notificationService.displayError( msj);
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else{
                            defered.reject(error);
                        }
                    });
            return promise;
        }

        function put(url, data) {
            var defered = $q.defer();
            var promise = defered.promise;                
            $http.put(resolve_api_uri(url), data)
                    .then(function (result) {
                        defered.resolve(result);
                    }, function (error) {
                        if (error.status == '401') {
                            var msj = error.data.error_description ? error.data.error_description : 'Authentication required.';
                            notificationService.displayError( msj);
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else {
                            defered.reject(error);
                        }
                    });
            return promise;
        }        

        function delet(url) {
            var defered = $q.defer();
            var promise = defered.promise;             
            $http.delete(resolve_api_uri(url))
                    .then(function (result) {
                        defered.resolve(result);
                    }, function (error) {
                        if (error.status == '401') {
                            var msj = error.data.error_description ? error.data.error_description : 'Authentication required.';
                            notificationService.displayError( msj);
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else {
                            defered.reject(error);
                        }
                    });
            return promise;
        }  

        return service;
    }

})(angular.module('common.core'));
