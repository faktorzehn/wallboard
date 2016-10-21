'use strict';

angular.module('wallboardApp')
    .filter('levelColor', function () {
        return function (input) {

            switch(input) {
                case 'OK':
                    return 'green';
                case 'WARN':
                    return 'yellow';
                case 'ERROR':
                    return 'red';
                default:
                    return 'grey';
            }

        };
    });
