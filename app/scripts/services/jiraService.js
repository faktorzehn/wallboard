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
    .factory('jira', function ($resource, wconfig) {

        var uri = wconfig.getServices().jira.uri,
            token = wconfig.getServices().jira.token,

            getIssues = function (filter, startAt, fields) {
                var url = uri + '/rest/api/latest/search',
                    params = {
                        jql: 'filter=' + filter,
                        startAt: startAt,
                        fields: fields
                    };

                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getResolvedIssues = function (filter, fields) {
                var url = uri + '/rest/api/latest/search',
                    params = {
                        jql: 'filter=' + filter + ' AND resolution!=Unresolved',
                        fields: fields
                    };

                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getUser = function (name) {
                var url = uri + '/rest/api/latest/user',
                    params = {
                        username: name
                    };

                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getMilestone = function (issueID, customFieldID, confSchemeId) {
                var url = uri + '/rest/idalko-igrid/latest/datagrid/data',
                    params = {
                        _mode: 'view',
                        _issueId: issueID,
                        _fieldId: customFieldID,
                        _confSchemeId: confSchemeId,
                        sord: 'desc'
                    };

                return $resource(url, params, {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {Authorization: 'Basic ' + token}
                    }
                });
            },

            getIssuesForMilestones = function (filter, datum) {
                var query = filter + ' AND issue in grid(Milestones, "Actual=null AND Planned<' + "'" + datum + "'" + '")';
                return this.getIssues(query, 0, 'summary');
            };

        // Public API here
        return {
            getIssues: getIssues,
            getResolvedIssues: getResolvedIssues,
            getUser: getUser,
            getMilestone: getMilestone,
            getIssuesForMilestones: getIssuesForMilestones,
            uri: uri
        };

    });

