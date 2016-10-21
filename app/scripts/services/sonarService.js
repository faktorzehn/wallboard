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
    .factory('sonar', function ($resource, wconfig) {

        var uri = wconfig.getServices().sonar.uri,
            token = wconfig.getServices().sonar.token,

            getMetrics = function (metrics, project) {
                var url = uri + '/api/resources',
                    params = {
                        resource: project,
                        metrics: metrics,
                        includetrends: true
                    };
                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: true,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getQualityGate = function(project) {
                var url = uri + '/api/resources',
                    params = {
                        resource: project,
                        metrics: 'quality_gate_details'
                    };
                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: true,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getNewIssues = function (project, createdbefore) {
                var url = uri + '/api/issues/search',
                    params = {
                        resolved: false,
                        projectKeys: project,
                        assigned: false,
                        createdAfter: createdbefore,
                        facets: 'severities',
                        hideRules: true
                };

                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getIssues = function (project, assignee) {
                var url = uri + '/api/issues/search',
                    params = {
                        resolved: false,
                        projectKeys: project,
                        assignees: assignee,
                        facets: 'severities',
                        hideRules: true
                };

                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getUsers = function () {
                var url = uri + '/api/users/search';

                return $resource(url, {}, {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getProject = function (project) {
                var url = uri + '/api/projects/index',
                    params = {
                        key: project
                    };

                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: true,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            };

        // Public API here
        return {
            getProject: getProject,
            getMetrics: getMetrics,
            getNewIssues: getNewIssues,
            getIssues: getIssues,
            getUsers: getUsers,
            getQualityGate: getQualityGate,
            uri: uri
        };

    });

