'use strict';

angular.module('wallboardApp')
    .filter('jiraissuecountColor', function () {
        return function (input) {

            if (input == 'fixversion' || input == 'name') {
                return 'onecolor';
            } else {
                return 'failure';
            }
        };
    });
