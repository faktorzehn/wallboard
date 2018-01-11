'use strict';

angular.module('wallboardApp')
    .filter('decodeURI', function () {
        return function (input) {
            return decodeURIComponent(input);
        };
    });
