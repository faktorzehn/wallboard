/**
 * Wallboard - Tool to improve the productivity of developers.
 * Copyright (C) 2016 ConVista Faktor Zehn GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

angular.module('wallboardApp')
    .directive('widget', function ($compile) {

        /* directives dynamisch erzeugen */

        function link(scope, element, attributes) {

            var newDirective = angular.element('<' + scope.config.widget + '/>');

            angular.forEach(scope.config, function (value, key) {

                if (key.indexOf('$$') != 0) {
                    if(angular.isArray(value) || angular.isObject(value)) {
                        newDirective.attr(key, angular.toJson(value));
                    } else {
                        newDirective.attr(key, value);
                    }
                }

            });

            element.append($compile(newDirective)(scope));

        }

        return {
            restrict: 'E',
            scope: {config: '='},
            link: link
        };
    });
