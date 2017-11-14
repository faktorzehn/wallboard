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
    .factory('jenkins', function ($resource, wconfig) {

        var uri = wconfig.getServices().jenkins.uri,
            token = wconfig.getServices().jenkins.token,

            // Service logic
            lastSuccessfulBuild = 'lastSuccessfulBuild',
            lastBuild = 'lastBuild',
            lastCompletedBuild = 'lastCompletedBuild',
            lastStableBuild = 'lastStableBuild',
            jsonPath = 'api/json',
            testReport = 'testReport',

            createResource = function (url, isArray) {
                return $resource(url, {}, {
                    get: {
                        method: 'GET',
                        isArray: isArray,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },
            getBuild = function (job, build, fields) {
                return createResource(uri + '/job/' + job + '/' + build + '/' + jsonPath + '?tree=' + fields, false);
            },

            getTestReport = function (job, build, fields) {
                return createResource(uri + '/job/' + job + '/' + build + '/' + testReport + '/' + jsonPath + '?tree=' + fields, false);
            },

            getRuns = function(job) {
                return createResource(uri + '/job/' + job + '/wfapi/runs', true);
            };

        // Public API here
        return {
            uri: uri,
            lastSuccessfulBuild: lastSuccessfulBuild,
            lastBuild: lastBuild,
            lastCompletedBuild: lastCompletedBuild,
            lastStableBuild: lastStableBuild,
            getTestReport: getTestReport,
            getBuild: getBuild,
            getRuns: getRuns
        }
    });

