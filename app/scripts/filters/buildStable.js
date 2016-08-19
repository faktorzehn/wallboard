'use strict';

angular.module('wallboardApp')
    .filter('buildStable', function () {
        return function (input) {
            if (input === 'UNSTABLE') {
                return 'warning';
            }

            if (input === 'FAILURE') {
                return 'danger';
            }

            if (input === 'SUCCESS') {
                return 'success';
            }

            return 'info';
        };
    });
