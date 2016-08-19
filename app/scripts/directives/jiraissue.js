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
    .directive('jiraissue', function ($interval, jira, wconfig, $log) {

        function link(scope, element, attrs) {

            scope.issueNumber = 0;

            function loadData() {
                jira.getIssues(scope.filter, 0, 'total').get(function (issueResponse) {
                    scope.issueNumber = issueResponse.total;
                    scope.jiraLink = wconfig.getServices().jira.uri + '/issues/?jql=filter=' + scope.filter;
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an Jira!\n" + JSON.stringify(error));
                    }
                });
            }

            loadData();

            // set default refresh value to 20 minutes
            if(angular.isUndefined(scope.refresh)) {
                scope.refresh = 1200;
            }

            var stopTime = $interval(loadData, scope.refresh * 1000);

            // listen on DOM destroy (removal) event, and cancel the next UI update
            // to prevent updating time ofter the DOM element was removed.
            element.on('$destroy', function () {
                $interval.cancel(stopTime);
            });
        }

        return {
            restrict: 'E',
            templateUrl: 'views/jiraissue.html',
            scope: {name: '@', filter: '@', onecolor: '@', colorthreshold: '@', refresh: '@'},
            link: link
        };
    });
