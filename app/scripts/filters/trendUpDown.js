'use strict';

angular.module('wallboardApp')
    .filter('trendUpDown', function () {
        return function (trend, reverse) {

            if (!angular.isNumber(trend)) {
                return 'failure';
            }
            if (trend > 0) {
                if (reverse) {
                    return 'bad-down';
                } else {
                    return 'bad-up';
                }
            } else if (trend < 0) {
                if (reverse) {
                    return 'good-up';
                } else {
                    return 'good-down';
                }
            } else
                return 'neutral';
        };
    });
