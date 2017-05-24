'use strict';

angular.module('wallboardApp')
    .filter('jiraissuecountSort', function () {
        return function (input, minvalue) {

            if (input != undefined) {
                var output = [];

                for (var i = 0; i < input.length; i++) {
                    if (input[i].value >= minvalue) {
                        output.push(input[i]);
                    }
                }

                return output;
            }

        };
    });
