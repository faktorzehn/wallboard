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
    .directive('jenkinsjob', function ($interval, jenkins) {

        function link(scope, element, attrs) {

            scope.nowTime = (new Date()).getTime();
            scope.lastBuildProgress = 0;
            scope.healthBuild = 100;
            scope.numberOfFaildBuilds = 0;

            var fieldsReport = 'failCount,totalCount,childReports[child[url],result[failCount]]',
                fieldsBuild = 'number,url,timestamp,duration,estimatedDuration,fullDisplayName,building,builtOn,result';

            function refreshHealth() {

                if (!scope.lastSuccessfulBuild) {
                    return;
                }

                if (!scope.testReportLastSuccessfulBuild) {
                    return;
                }

                var testHealth = 100;
                if (scope.testReportLastSuccessfulBuild.totalCount != 0) {
                    testHealth = 100 - (scope.testReportLastSuccessfulBuild.failCount / scope.testReportLastSuccessfulBuild.totalCount * 100);
                }

                var buildHealth = 100 - (scope.numberOfFaildBuilds * (1 / 5) * 100);

                scope.healthBuild = Math.min(testHealth, buildHealth);
            }

            function refreshNumberOfFaildBuilds(currentBuild) {

                if (currentBuild.result === 'FAILURE') {
                    scope.numberOfFaildBuilds++;
                    refreshHealth();
                }

                if (currentBuild.number > scope.lastSuccessfulBuild.number - 5) {
                    jenkins.getBuild(scope.job, currentBuild.number - 1, fieldsBuild).get(function (lastCheckBuild) {
                        refreshNumberOfFaildBuilds(lastCheckBuild);
                    });
                }

            }

            function loadTestReportLastSuccessfulBuild() {
                jenkins.getTestReport(scope.job, jenkins.lastSuccessfulBuild, fieldsReport).get(function (report) {
                    scope.testReportLastSuccessfulBuild = report;
                    refreshHealth();
                });
            }

            function loadTestReportLastBuild() {
                jenkins.getTestReport(scope.job, jenkins.lastBuild, fieldsReport).get(function (testReport) {
                    scope.testReportLastBuild = testReport;
                });
            }

            function loadLastBuild() {
                jenkins.getBuild(scope.job, jenkins.lastBuild, fieldsBuild).get(function (build) {
                    scope.lastBuild = build;

                    scope.nowTime = (new Date()).getTime();
                    var t = (scope.nowTime - scope.lastBuild.timestamp) / scope.lastBuild.estimatedDuration * 100;
                    scope.lastBuildProgress = t > 100 ? 100 : t;
                });
            }

            function loadLastSuccessfulBuild() {
                jenkins.getBuild(scope.job, jenkins.lastSuccessfulBuild, fieldsBuild).get(function (build) {

                    var oldlastSuccessfulBuild = scope.lastSuccessfulBuild;
                    scope.lastSuccessfulBuild = build;

                    if (!oldlastSuccessfulBuild || !scope.lastSuccessfulBuild || scope.lastSuccessfulBuild.number !== oldlastSuccessfulBuild.number) {
                        scope.numberOfFaildBuilds = 0;
                        refreshNumberOfFaildBuilds(scope.lastSuccessfulBuild);

                    }
                    refreshHealth();

                });
            }

            function updateAll() {
                loadLastBuild();
                loadLastSuccessfulBuild();
                loadTestReportLastSuccessfulBuild();
                loadTestReportLastBuild();
            }

            updateAll();

            // set default refresh value to 10 seconds
            if(angular.isUndefined(scope.refresh)) {
                scope.refresh = 10;
            }

            var stopTime = $interval(updateAll, scope.refresh * 1000);

            // listen on DOM destroy (removal) event, and cancel the next UI update
            // to prevent updating time ofter the DOM element was removed.
            element.on('$destroy', function () {
                $interval.cancel(stopTime);
            });

        }

        return {
            restrict: 'E',
            templateUrl: 'views/job.html',
            scope: {job: '@', name: '@', size: '@', refresh: '@'},
            link: link
        };
    });
