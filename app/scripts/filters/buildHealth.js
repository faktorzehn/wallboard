'use strict';

angular.module('wallboardApp')
    .filter('buildHealth', function () {
        return function (input) {

            if (input <= 20) {
                return 'very-bad';
            }

            if (input > 20 && input <= 40) {
                return 'bad';
            }
            if (input > 40 && input <= 60) {
                return 'not-bad';
            }

            if (input > 60 && input <= 80) {
                return 'good';
            }

            if (input > 80) {
                return 'very-good';
            }

            return 'fail';

        };
    });
