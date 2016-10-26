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

angular.module('wallboardAppDev')
    .run(function($httpBackend) {

        $httpBackend.whenGET(/jira\/rest\/api\/latest\/search\?fields=(.*)&jql=filter%3D15781&startAt=0/, undefined, ['fields'])
            .respond(function(method, url, data) {
                var response = {
                    "total": 20,
                    "issues": [
                        {
                            "id": "",
                            "key": "key-1",
                            "fields": {
                                "assignee": {
                                    "displayName": "John Doe"
                                },
                                "fixVersions": [
                                    {
                                        "name": "17.01"
                                    }
                                ],
                                "duedate": "2016-02-10",
                                "issuetype": {
                                    "name": "Bug"
                                },
                                "customfield_123": "12345"
                            }
                        },
                        {
                            "id": "",
                            "key": "key-2",
                            "fields": {
                                "assignee": {
                                    "displayName": "John Doe"
                                },
                                "fixVersions": [
                                    {
                                        "name": "18.01"
                                    }
                                ],
                                "duedate": "2016-05-10",
                                "issuetype": {
                                    "name": "Task"
                                },
                                "customfield_123": "532255"
                            }
                        },
                        {
                            "id": "",
                            "key": "key-3",
                            "fields": {
                                "assignee": {
                                    "displayName": "Jane Doe"
                                },
                                "fixVersions": [
                                    {
                                        "name": "18.01"
                                    }
                                ],
                                "duedate": "2100-01-01",
                                "issuetype": {
                                    "name": "Bug"
                                },
                                "customfield_123": "12345, 432543"
                            }
                        }
                    ]
                };
                return [200, response, {}];
            });

        // jira progress
        $httpBackend.whenGET(/jira\/rest\/api\/latest\/search\?fields=(.*)&jql=filter%3D15781\+AND\+resolution!%3DUnresolved&startAt=0/, undefined, ['fields'])
            .respond(function(method, url, data) {
                var response = {
                    "total": 10
                };
                return [200, response, {}];
            });

        // issues for milestones
        $httpBackend.whenGET(/jira\/rest\/api\/latest\/search\?fields=(.*)&jql=filter%3D15781\+AND\+issue\+in\+grid\(.*\)&startAt=0/, undefined, ['fields'])
            .respond(function(method, url, data) {
                var response = {
                    "total": 10,
                    "issues": [
                        {
                            "id": "1234",
                            "fields": {
                                "summary": "Release 16.01"
                            }
                        }
                    ]
                };
                return [200, response, {}];
            });

        // milestones
        $httpBackend.whenGET(/jira\/rest\/idalko-igrid\/latest\/datagrid\/data\?(.*)/)
            .respond(function(method, url, data) {
                var response = {
                    "rows": [
                        {
                            "id": "233",
                            "cell": [
                                "External Meeting",
                                "29/03/2016",
                                "",
                                "Proposal"
                            ]
                        },
                        {
                            "id": "234",
                            "cell": [
                                "Estimation",
                                "03/11/2016",
                                "",
                                ""
                            ]
                        },
                        {
                            "id": "235",
                            "cell": [
                                "Estimation",
                                "03/10/2016",
                                "",
                                ""
                            ]
                        },
                        {
                            "id": "235",
                            "cell": [
                                "Never visible",
                                "03/12/2100",
                                "",
                                ""
                            ]
                        }
                    ]
                };
                return [200, response, {}];
            });

    });
