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
        const fieldsBuild = 'url,result,culprits[fullName],building,timestamp,duration,estimatedDuration';

        function link(scope, element, attrs) {

            scope.buildsArray = scope.builds;
            scope.metricsArray = scope.metrics;
            scope.multiBuildsArray = scope.multibuilds;

            // load info from last completed build
            function loadLastCompletedBuild(build) {
                jenkins.getBuild(build.job, jenkins.lastCompletedBuild, fieldsBuild).get(function (response) {
                    build.result = response.result;
                    build.url = response.url;
                    build.culprits = response.culprits;

                    if (!build.name) {
                        build.name = build.job;
                    }

                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an Jenkins!\n" + JSON.stringify(error));
                    }
                });
            }

            // load progress from last build
            function loadProgress(build) {
                jenkins.getBuild(build.job, jenkins.lastBuild, fieldsBuild).get(function (response) {
                    build.building = response.building;

                    /* calculate progress */
                    var now = (new Date()).getTime();
                    var t = (now - response.timestamp) / response.estimatedDuration * 100;
                    build.progress = t > 100 ? 100 : t;

                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an Jenkins!\n" + JSON.stringify(error));
                    }
                });
            }

            // load test info from last completed build
            function loadTestInfos(build) {
                jenkins.getTestReport(build.job, jenkins.lastCompletedBuild, fieldsReport).get(function (response) {
                    build.failedTests = response.failCount;
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an Jenkins!\n" + JSON.stringify(error));
                    }
                });

                if (build.staged) {
                    jenkins.getRuns(build.job).get(function (response) {
                        build.stages = response[0].stages;
                    }, function (error) {
                        if (error) {
                            $log.error("Fehler beim Anmelden an Jenkins!\n" + JSON.stringify(error));
                        }
                    });
                }
            }

            function updateBuilds() {
                angular.forEach(scope.buildsArray, function (build) {
                    loadLastCompletedBuild(build);
                    loadProgress(build);
                    loadTestInfos(build);
                });
            }

            function updateMultiBuilds() {
                scope.multiBuildsChildArray = [];
                angular.forEach(scope.multiBuildsArray, function (multibuild) {
                    jenkins.getMultiBuild(multibuild.job).get(function (response) {
                        angular.forEach(response.jobs, function (build) {

                            // due to a bug in jenkins we need to encode the build name
                            build.job = multibuild.job + '/job/' + encodeURI(build.name);

                            loadLastCompletedBuild(build);
                            loadProgress(build);
                            loadTestInfos(build);

                            scope.multiBuildsChildArray.push(build);
                        })
                    }, function (error) {
                        if(error) {
                            $log.error("Fehler beim laden eines Multibuilds!\n" + JSON.stringify(error));
                        }
                    });
                });
            }

            function updateMetrics() {
                angular.forEach(scope.metricsArray, function (metric) {

                    // load global sonar project
                    var project = scope.sonarproject;
                    // load metric specific project
                    if (metric.project) {
                        project = metric.project;
                    }

                    var Sonar = sonar.getMetrics(metric.metric, project);
                    Sonar.get(function (response) {
                        var measure = response.component.measures[0];

                        if (!metric.name) {
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
                        if (response.metrics[0].domain) {
                            metric.url += '/domain/' + response.metrics[0].domain;
                        }
                        metric.url += '?id=' + escape(project);
                    }, function (error) {
                        if (error) {
                            $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                        }
                    });
                });
            }

            function updateQualitygate() {

                // load global sonar project
                var project = scope.sonarproject;
                // load metric specific project
                if (scope.qualitygate.project) {
                    project = scope.qualitygate.project;
                }

                var Sonar = sonar.getQualityGate(project);

                Sonar.get(function (response) {
                    if (response.component) {
                        var data = JSON.parse(response.component.measures[0].value);
                        scope.qualitygate.level = data.level;
                        scope.qualitygate.conditions = data.conditions;
                    } else {
                        $log.warn("Keine Ergebnisse fuer Quality Gate fuer Projekt " + project + " bekommen!");
                    }
                }, function (error) {
                    if (error) {
                        $log.error("Fehler beim Anmelden an SonarQube!\n" + JSON.stringify(error));
                    }
                });
            }

            function updateAll() {
                if (scope.builds) {
                    updateBuilds();
                }
                if (scope.multibuilds) {
                    updateMultiBuilds();
                }
                if (scope.metrics) {
                    updateMetrics();
                }
                if (scope.qualitygate) {
                    updateQualitygate();
                }
            }

            updateAll();

            // set default refresh value to 10 seconds
            if (angular.isUndefined(scope.refresh)) {
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
            scope: {name: '@', builds: '=', multibuilds: '=', metrics: '=', qualitygate: '=', sonarproject: '@', customclass: '@', refresh: '@'},
            link: link
        };
    });
