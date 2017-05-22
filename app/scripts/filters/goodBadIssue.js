'use strict';

angular.module('wallboardApp')
    .filter('goodBadIssue', function () {
        return function (input) {

            if (input == undefined) {
                return '';
            }

            if (input['BLOCKER'] > 0 || input['CRITICAL'] > 0 || input['MAJOR'] > 0) {
                return 'bad';
            } else if (input['MINOR'] > 0 || input['INFO'] > 0) {
                return 'neutral';
            } else if (input['BLOCKER'] == 0, input['CRITICAL'] == 0, input['MAJOR'] == 0, input['MINOR'] == 0, input['INFO'] == 0) {
                return 'neutral';
            } else
                return 'failure';
        };
    });
