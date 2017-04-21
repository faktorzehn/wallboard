'use strict';

angular.module('wallboardApp')
    .filter('qualitygateLevel', function () {
        return function (input) {
            if (input === 'OK') {
                return 'neutral';
            } else if (input === 'WARN') {
                return 'warn';
            } else if(input === 'ERROR') {
                return 'bad';
            } else {
                return 'failure';
            }
        };
    });
