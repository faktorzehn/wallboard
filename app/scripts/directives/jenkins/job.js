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
    .directive('jenkins.job', function ($interval, jenkins) {

        const buildHistory = 5;
        const fieldsReport = 'failCount,totalCount,childReports[child[url],result[failCount]]';
        const fieldsLastCompletedBuild = 'number,url,timestamp,fullDisplayName,result';
        const fieldsLastSuccessfulBuild = 'number,url,timestamp,fullDisplayName,result';
        const fieldsLastBuild = 'timestamp,duration,estimatedDuration,building';

        function link(scope, element) {

            scope.lastBuild = null;
            scope.lastBuildProgress = -1;

            scope.lastSuccessfulBuild = null;
            scope.lastSuccessfulBuildTestReport = null;

            scope.lastCompletedBuild = null;
            scope.lastCompletedBuildTestReport = null;

            scope.now = (new Date()).getTime();
            scope.jobHealth = 100;
            scope.failedBuilds = 0;

            function loadLastBuild() {
                jenkins.getBuild(scope.job, jenkins.lastBuild, fieldsLastBuild).get(function (build) {
                    scope.lastBuild = build;

                    /* calculate progress */
                    scope.now = (new Date()).getTime();
                    var t = (scope.now - scope.lastBuild.timestamp) / scope.lastBuild.estimatedDuration * 100;
                    scope.lastBuildProgress = t > 100 ? 100 : t;
                });
            }

            function loadLastCompletedBuild() {
                jenkins.getBuild(scope.job, jenkins.lastCompletedBuild, fieldsLastCompletedBuild).get(function (build) {
                    scope.lastCompletedBuild = build;
                });
            }

            function loadLastCompletedBuildTestReport() {
                jenkins.getTestReport(scope.job, jenkins.lastCompletedBuild, fieldsReport).get(function (testReport) {
                    scope.lastCompletedBuildTestReport = testReport;
                });
            }

            function loadLastSuccessfulBuild() {
                jenkins.getBuild(scope.job, jenkins.lastSuccessfulBuild, fieldsLastSuccessfulBuild).get(function (build) {

                    var oldlastSuccessfulBuild = scope.lastSuccessfulBuild;
                    scope.lastSuccessfulBuild = build;

                    if (!oldlastSuccessfulBuild || !scope.lastSuccessfulBuild || scope.lastSuccessfulBuild.number !== oldlastSuccessfulBuild.number) {
                        scope.failedBuilds = 0;
                        refreshNumberOfFailedBuilds(scope.lastSuccessfulBuild);

                    }
                    calculateBuildHealth();

                });
            }

            function refreshNumberOfFailedBuilds(currentBuild) {
                if (currentBuild.result === 'FAILURE') {
                    scope.failedBuilds++;
                    calculateBuildHealth();
                }
                if (currentBuild.number > scope.lastSuccessfulBuild.number - buildHistory) {
                    jenkins.getBuild(scope.job, currentBuild.number - 1, fieldsLastCompletedBuild).get(function (lastCheckBuild) {
                        refreshNumberOfFailedBuilds(lastCheckBuild);
                    });
                }
            }

            function loadLastSuccessfulBuildTestReport() {
                jenkins.getTestReport(scope.job, jenkins.lastSuccessfulBuild, fieldsReport).get(function (testReport) {
                    scope.lastSuccessfulBuildTestReport = testReport;
                    calculateBuildHealth();
                });
            }

            /**
             * Calculates the current build health.
             *
             * The build health is the minimum of the percent of successful tests of the last successful
             * build and the amount of successful builds within the last x builds.
             */
            function calculateBuildHealth() {

                var testHealth = 100;
                var buildHealth = 100;

                /* job has no successful build so far */
                if(!scope.lastSuccessfulBuild) {
                    scope.jobHealth = 0;
                    return;
                }

                /* calculate the percent of successful builds within the last x builds */
                if(scope.failedBuilds > 0) {
                    buildHealth -= (scope.failedBuilds * (1 / buildHistory) * 100);
                }

                /* only for jobs with testreport */
                if(scope.lastSuccessfulBuildTestReport) {
                    /* calculate the percent of successful tests of the last successful build */
                    if (scope.lastSuccessfulBuildTestReport.totalCount > 0) {
                        testHealth -= (scope.lastSuccessfulBuildTestReport.failCount / scope.lastSuccessfulBuildTestReport.totalCount * 100);
                    }
                }

                scope.jobHealth = Math.min(testHealth, buildHealth);
            }

            function updateAll() {
                loadLastCompletedBuild();
                loadLastBuild();
                loadLastCompletedBuildTestReport();
                loadLastSuccessfulBuild();
                loadLastSuccessfulBuildTestReport();
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
            templateUrl: 'views/widgets/jenkins/job.html',
            scope: {job: '@', name: '@', size: '@', refresh: '@'},
            link: link
        };
    });
