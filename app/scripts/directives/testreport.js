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
    .directive('testreport', function ($interval, jenkins, $log) {

        function link(scope, element) {

            function load() {

                // define fields to minimize size of response json
                var fieldsBuild = 'number,url,timestamp,duration,estimatedDuration,fullDisplayName,building,builtOn,result,culprits[fullName]',
                    fieldsReport = 'failCount,childReports[child[url],result[failCount]]';

                jenkins.getBuild(scope.job, jenkins.lastSuccessfulBuild, fieldsBuild).get(function (build) {
                    scope.lastSuccessfulBuild = build;
                }, function (error) {
                    $log.warn("Keine Ergebnisse fuer Build " + scope.job + " gefunden.\n" + JSON.stringify(error));
                });

                jenkins.getBuild(scope.job, jenkins.lastBuild, fieldsBuild).get(function (build) {
                    scope.lastBuild = build;
                }, function (error) {
                    $log.warn("Keine Ergebnisse fuer Build " + scope.job + " gefunden.\n" + JSON.stringify(error));
                });

                jenkins.getTestReport(scope.job, jenkins.lastSuccessfulBuild, fieldsReport).get(function (report) {
                    scope.testReportLastSuccessfulBuild = report;
                }, function (error) {
                    $log.warn("Keine Ergebnisse fuer Build " + scope.job + " gefunden.\n" + JSON.stringify(error));
                });

                jenkins.getTestReport(scope.job, jenkins.lastBuild, fieldsReport).get(function (report) {
                    scope.testReportLastBuild = report;
                }, function (error) {
                    $log.warn("Keine Ergebnisse fuer Build " + scope.job + " gefunden.\n" + JSON.stringify(error));
                });

            }

            load();

            // set default refresh value to 10 seconds
            if(angular.isUndefined(scope.refresh)) {
                scope.refresh = 10;
            }

            var stopTime = $interval(load, scope.refresh * 1000);

            // listen on DOM destroy (removal) event, and cancel the next UI update
            // to prevent updating time ofter the DOM element was removed.
            element.on('$destroy', function () {
                $interval.cancel(stopTime);
            });

        }

        return {
            restrict: 'E',
            templateUrl: 'views/testreport.html',
            scope: {job: '@', name: '@', refresh: '@'},
            link: link
        };
    });
