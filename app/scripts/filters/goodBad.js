'use strict';

angular.module('wallboardApp')
    .filter('goodBad', function () {
        return function (input) {

            if (!angular.isNumber(input)) {
                return 'failure';
            }
            if (input > 0) {
                return 'bad';
            } else if (input < 0) {
                return 'good';
            } else {
                return 'neutral';
            }
        };
    });
