(function(app) {
    'use strict';

    app.directive('topBar', topBar);

    function topBar() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './views/bars/topBar.html'
        }
    }

})(angular.module('common.ui'));