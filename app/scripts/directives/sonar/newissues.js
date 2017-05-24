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
    .directive('sonar.newissues', function ($interval, sonar, $log, moment) {

        function link(scope, element, attrs) {

            scope.issues = {};
            //TODO: make configurable
            scope.severities = {
                "BLOCKER": 0,
                "CRITICAL": 0,
                "MAJOR": 0,
                "MINOR": 0,
                "INFO": 0
            };
            scope.totalLink = '';
            scope.issueLink = '';

            // calculate before date with the help of MomentJs
            var before = moment().subtract(parseInt(scope.createdbefore), 'days').format('YYYY-MM-DD');

            scope.totalLink = function (severity) {
                return sonar.uri + '/issues/search#resolved=false|createdAfter=' + before +
                    '|projectKeys=' + escape(scope.project) + '|assigned=false|severities='
                    + severity;
            };

            /* setzt den projektnamen auf scope */
            function setProjectName() {
                sonar.getProject(scope.project).get(function (projectResponse) {
                    scope.projectName = projectResponse[0].nm;
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                    }
                });
            }

            function getIssuesForAll() {

                sonar.getNewIssues(scope.project, before).get(function (newIssueResponse) {

                    scope.totalIssues = newIssueResponse.total;
                    scope.issues = newIssueResponse.issues;

                    angular.forEach(newIssueResponse.facets[0].values, function (value) {
                        scope.severities[value.val] = value.count;
                    });

                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                    }
                });

                scope.issueLink = sonar.uri + '/issues/search#issues=';

            }

            setProjectName();
            getIssuesForAll();

            // set default refresh value to 20 minutes
            if (angular.isUndefined(scope.refresh)) {
                scope.refresh = 1200;
            }

            var stopTime = $interval(getIssuesForAll, scope.refresh * 1000);

            // listen on DOM destroy (removal) event, and cancel the next UI update
            // to prevent updating time ofter the DOM element was removed.
            element.on('$destroy', function () {
                $interval.cancel(stopTime);
            });
        }


        return {
            restrict: 'E',
            templateUrl: 'views/widgets/sonar/newissues.html',
            scope: {project: '@', name: '@', createdbefore: '@', refresh: '@'},
            link: link
        };
    });
