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
    .directive('project', function ($interval, jenkins, sonar, $log) {

        const fieldsReport = 'failCount';
        const fieldsBuild = 'url,result';

        function link(scope, element, attrs) {

            scope.buildsArray = scope.builds;
            scope.metricsArray = scope.metrics;

            function updateBuilds() {
                angular.forEach(scope.buildsArray, function(build) {
                    jenkins.getBuild(build.job, jenkins.lastCompletedBuild, fieldsBuild).get(function (response) {
                        build.result = response;
                        build.url = response.url;

                        if(!build.name) {
                            build.name = build.job;
                        }

                    }, function(error) {
                        if(error) {
                            $log.error("Fehler beim Anmelden an Jenkins!\n" + JSON.stringify(error));
                        }
                    });
                    jenkins.getTestReport(build.job, jenkins.lastCompletedBuild, fieldsReport).get(function (response) {
                        build.failedTests = response.failCount;
                    }, function(error) {
                        if(error) {
                            $log.error("Fehler beim Anmelden an Jenkins!\n" + JSON.stringify(error));
                        }
                    });
                });
            }

            function updateMetrics() {
                angular.forEach(scope.metricsArray, function(metric) {
                    var Sonar = sonar.getMetrics(metric.metric, metric.project);
                    Sonar.get(function (response) {
                        var measure = response.component.measures[0];

                        if(!metric.name) {
                            metric.name = response.metrics[0].name;
                        }

                        metric.value = Number(measure.value);
                        metric.unit = response.metrics[0].type;
                        metric.trendVal = Number(measure.periods[0].value);
                        metric.trendDir = metric.trendVal;
                        if (response.metrics[0].higherValuesAreBetter) {
                            metric.trendDir *= -1;
                        }

                        metric.url = sonar.uri + '/component_measures';
                        if(response.metrics[0].domain) {
                            metric.url += '/domain/' + response.metrics[0].domain;
                        }
                        metric.url += '?id=' + escape(metric.project);
                    }, function (error) {
                        if (error) {
                            $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                        }
                    });
                });
            }

            function updateQualitygate() {
                var Sonar = sonar.getQualityGate(scope.qualitygate.project);

                Sonar.get(function (response) {
                    if (response.component) {
                        var data = JSON.parse(response.component.measures[0].value);
                        scope.qualitygate.level = data.level;
                        scope.qualitygate.conditions = data.conditions;
                    } else {
                        $log.warn("Keine Ergebnisse fuer Quality Gate fuer Projekt " + scope.project + " bekommen!");
                    }
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                    }
                });
            }

            function updateAll() {
                if(scope.builds) {
                    updateBuilds();
                }
                if(scope.metrics) {
                    updateMetrics();
                }
                if(scope.qualitygate) {
                    updateQualitygate();
                }
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
            templateUrl: 'views/widgets/project.html',
            scope: {name: '@', builds: '=', metrics: '=', qualitygate: '='},
            link: link
        };
    });
