'use strict';

angular.module('wallboardApp')
    .filter('metricUnit', function () {
        return function (input) {
            if (input === "INT") {
                return '';
            } else if (input === "PERCENT") {
                return '%';
            } else
                return '';
        };
    });
