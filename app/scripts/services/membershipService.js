(function (app) {
    'use strict';

    app.factory('membershipService', membershipService);

    membershipService.$inject = ['apiService', 'notificationService','$http',  '$cookieStore', '$rootScope'];

    function membershipService(apiService, notificationService, $http,  $cookieStore, $rootScope) {

        var service = {
            login: login,
            saveCredentials: saveCredentials,
            removeCredentials: removeCredentials,
            isUserLoggedIn: isUserLoggedIn
        }

        function login(user, completed) {
            user.client_id = "z46XgA9W1Gn1vyIOFHyCRpeo0fFCRbSBUHARqe5H";
            user.client_secret = "106Dd3QazqMqcpKJK7zqqlm8WXt6ww0yrYqVBOtfwxVkjABoXuhmv1KLNYCoJo5Gwx8vgZiehcp7YNBPvCbDXt3No60WWbTTzZpUDS0lfyB3JbEyhDjbkVvJh1M5cFA1";
            user.grant_type = "password";
            apiService.post('/auth/token', user)
                .then(function(response) {
                    completed (response);
                })
                .catch(function(err) {
                    notificationService.displayError(response.data);
                });                
        }

        function saveCredentials(scope) {
            var membershipData = scope.acces_data.access_token;// $base64.encode(user.username + ':' + user.password);

            $rootScope.repository = {
                loggedUser: {
                    username: scope.user.username,
                    authdata: membershipData
                }
            };
            sessionStorage.userService = angular.toJson(service.model);
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + membershipData;
            $cookieStore.put('repository', $rootScope.repository);
        }

        function removeCredentials() {
            $rootScope.repository = {};
            $cookieStore.remove('repository');
            $http.defaults.headers.common.Authorization = '';
        };

        function isUserLoggedIn() {
            return $rootScope.repository.loggedUser != null;
        }

        return service;
    }



})(angular.module('common.core'));