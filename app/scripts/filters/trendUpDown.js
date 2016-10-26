'use strict';

angular.module('wallboardApp')
    .filter('trendUpDown', function () {
        return function (input) {

            if (!angular.isNumber(input)) {
                return 'failure';
            }
            if (input > 0) {
                return 'up';
            } else if (input < 0) {
                return 'down';
            } else
                return 'neutral';
        };
    });
