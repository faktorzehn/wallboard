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
    .directive('sonar.metric', function ($interval, sonar, $log, wconfig) {

        function link(scope, element, attrs) {

            function loadResult() {
                var Sonar = sonar.getMetrics(scope.metric, scope.project);

                var response = Sonar.get(function () {
                    var measure = response.component.measures[0];
                    if (measure) {
                        scope.metricResult = Number(measure.value);
                        scope.trendVal = Number(measure.periods[0].value);

                        scope.trendDir = scope.trendVal;
                        if (scope.reverse === 'true') {
                            scope.trendDir *= -1;
                        }

                    } else {
                        $log.warn("Keine Ergebnisse fuer " + scope.metric + " bekommen!");
                    }
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                    }
                });
            }

            loadResult();

            // set default refresh value to 1 hour
            if (angular.isUndefined(scope.refresh)) {
                scope.refresh = 3600;
            }

            var stopTime = $interval(loadResult, scope.refresh * 1000);

            // listen on DOM destroy (removal) event, and cancel the next UI update
            // to prevent updating time ofter the DOM element was removed.
            element.on('$destroy', function () {
                $interval.cancel(stopTime);
            });


            scope.analyseBuildUrl = wconfig.getServices().sonar.uri + '/dashboard/index/' + escape(scope.project);
        }

        return {
            restrict: 'E',
            templateUrl: 'views/widgets/sonar/metric.html',
            scope: {name: '@', metric: '@', reverse: '@', unit: '@', project: '@', refresh: '@'},
            link: link
        };
    });
