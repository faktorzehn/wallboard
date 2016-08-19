'use strict';

angular.module('wallboardApp')
    .filter('isZero', function () {
        return function (input) {

            if (!angular.isNumber(input)) {
                return 'failure';
            }
            if (input == 0) {
                return 'zero';
            } else if (input > 0) {
                return 'normal';
            } else
                return '';
        };
    });
