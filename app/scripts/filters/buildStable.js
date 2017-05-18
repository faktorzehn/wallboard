'use strict';

angular.module('wallboardApp')
    .filter('buildStable', function () {
        return function (input) {
            if (input === 'UNSTABLE') {
                return 'warn';
            }
            else if (input === 'FAILURE') {
                return 'bad';
            }
            else if (input === 'SUCCESS') {
                return 'neutral';
            }
            else if (input === 'ABORTED') {
                return 'aborted';
            }

            return 'failure';
        };
    });
