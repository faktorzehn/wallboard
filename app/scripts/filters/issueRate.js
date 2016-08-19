'use strict';

angular.module('wallboardApp')
    .filter('issueRate', function () {
        return function (input) {

            for (var key in input) {

                if (input['BLOCKER'] > 0 || input['MAJOR'] > 0 || input['CRITICAL'] > 0) {
                    return 'bad';
                } else if (input['MINOR'] > 0 || input['INFO'] > 0) {
                    return 'tolerable'
                } else {
                    return 'empty';
                }
            }

        };
    });