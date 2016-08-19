'use strict';

angular.module('wallboardApp')
    .filter('building', function () {
        return function (input) {
            if (input === true) {
                return 'active'
            }
            return '';
        };
    });
