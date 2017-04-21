'use strict';

angular.module('wallboardApp')
    .filter('buildStable', function () {
        return function (input) {
            if (input === 'UNSTABLE') {
                return 'warn';
            }

            if (input === 'FAILURE') {
                return 'bad';
            }

            if (input === 'SUCCESS') {
                return 'neutral';
            }

            return 'failure';
        };
    });
