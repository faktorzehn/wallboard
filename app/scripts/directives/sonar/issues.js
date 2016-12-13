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
    .directive('sonar.issues', function ($interval, sonar, $log) {

        function link(scope, element, attrs) {

            scope.map = {};
            scope.total = 0;

            //TODO make configurable
            scope.severities = {
                "BLOCKER": 100,
                "CRITICAL": 20,
                "MAJOR": 10,
                "MINOR": 2,
                "INFO": 1
            };

            scope.issues = function (user, severity) {
                return scope.map[user.name].issues[severity];
            };

            scope.userLink = function(user) {
                return sonar.uri + '/issues/search#resolved=false|assignees=' + user.login + '|projectKeys=' + escape(scope.project);
            };

            scope.issuesLink = function (user, severity) {
                return scope.userLink(user) + '|severities=' + severity;
            };

            function getIssuesByUser(user) {

                sonar.getIssues(scope.project, user.login).get(function (issueResponse) {
                    if (issueResponse.total > 0) {

                        scope.total += issueResponse.total;

                        scope.map[user.name].total = issueResponse.total;

                        /* map severities facet */
                        angular.forEach(issueResponse.facets[0].values, function(value) {
                            scope.map[user.name].issues[value.val] = value.count;
                            scope.map[user.name].issueRate += scope.severities[value.val] * value.count;
                        });

                    }
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                    }
                });
            }

            /* fuer jeden user aus sonar werden die zugewiesenen issues berechnet */
            function getIssuesForAll() {
                sonar.getUsers().get(function (userResponse) {

                    /* alle users durchitarieren */
                    angular.forEach(userResponse.users, function (user) {

                        //skip inactive users
                        if(!user.active) {
                            return;
                        }

                        // skip excluded users
                        if(angular.isDefined(scope.exclude) &&
                            scope.exclude.indexOf(user.login) >= 0) {
                            return;
                        }

                        scope.map[user.name] = {
                            name: user.name,
                            login: user.login,
                            total: 0,
                            link: '#',
                            issueRate: 0,
                            issues: {}
                        };

                        getIssuesByUser(user);

                    });
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                    }
                });
            }

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

            setProjectName();
            getIssuesForAll();

            // set default refresh value to 20 minutes
            if(angular.isUndefined(scope.refresh)) {
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
            templateUrl: 'views/widgets/sonar/issues.html',
            scope: {project: '@', name: '@', refresh: '@', exclude: '@', severities: '@'},
            link: link
        };
    });
