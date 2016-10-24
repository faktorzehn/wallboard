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
    .directive('jira.issuecount', function ($interval, jira, $log, wconfig) {

        function link(scope, element, attrs) {

            scope.data = [];

            function extractAssignee(issues) {
                angular.forEach(issues, function (issue) {

                    if (issue.fields.assignee != null) {

                        jira.getUser(issue.fields.assignee.name).get(function (user) {
                            var set = false;
                            for (var i = 0; i < scope.data.length; i++) {
                                if (scope.data[i].name == user.displayName) {
                                    scope.data[i].value++;
                                    set = true;
                                    break;
                                }
                            }

                            if (!set) {
                                scope.data.push({'name': user.displayName, 'value': 1, 'linkField': user.name});
                            }

                            scope.jiraLink = wconfig.getServices().jira.uri + '/issues/?jql=filter=' + scope.filter + ' AND assignee=';
                        }, function (error) {
                            if (error) {
                                $log.error("Fehler beim Anmelden an Jira!\n" + JSON.stringify(error));
                            }
                        });

                    }

                });
            }

            function extractFixversion(issues) {
                angular.forEach(issues, function (issue) {
                    if (issue.fields.fixVersions != null) {

                        angular.forEach(issue.fields.fixVersions, function (version) {
                            var set = false;
                            for (var i = 0; i < scope.data.length; i++) {
                                if (scope.data[i].name == version.name) {
                                    scope.data[i].value++;
                                    set = true;
                                    break;
                                }
                            }

                            if (!set) {
                                scope.data.push({'name': version.name, 'value': 1, 'linkField': version.name});
                            }

                            scope.jiraLink = wconfig.getServices().jira.uri + '/issues/?jql=filter=' + scope.filter + ' AND fixVersion=';
                        });

                    }
                });
            }

            function loadData() {

                var index = 0,
                    max = undefined;

                // reset data
                scope.data = [];

                jira.getIssues(scope.filter, index, 'total').get(function (issueResponse) {

                    max = issueResponse.total;

                    for (; index < max; index += issueResponse.maxResults) { // pagination

                        jira.getIssues(scope.filter, index, 'assignee,fixVersions').get(function (issueResponse) {

                            if (scope.groupby == 'name') {
                                extractAssignee(issueResponse.issues);
                            } else if (scope.groupby == 'fixversion') {
                                extractFixversion(issueResponse.issues);
                            }

                        }, function (error) {
                            if (error) {
                                $log.error("Fehler beim Anmelden an Jira!\n" + JSON.stringify(error));
                            }
                        });

                    }

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
            templateUrl: 'views/widgets/jira/issuecount.html',
            scope: {name: '@', filter: '@', groupby: '@', maxrow: '@', minvalue: '@', refresh: '@'},
            link: link
        };
    });
