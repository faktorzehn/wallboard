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

        // sonar blocker
        $httpBackend.whenGET(/sonar\/api\/resources\?includetrends=true&metrics=blocker_violations&resource=(.*)/, undefined, ['project'])
            .respond(function(method, url, data) {
                var resources = [
                    {
                        "date": (new Date()).getTime() - 1000000,
                        "msr": [
                            {
                                "val": 121,     // actual
                                "var1": 0,      // since previous analysis
                                "var2": 21,     // since 30 days
                                "var3": -16      // since previous version
                            }
                        ]
                    }
                ];
                return [200, resources, {}];
            });

        // sonar minor
        $httpBackend.whenGET(/sonar\/api\/resources\?includetrends=true&metrics=minor_violations&resource=(.*)/, undefined, ['project'])
            .respond(function(method, url, data) {
                var resources = [
                    {
                        "date": (new Date()).getTime() - 1000000,
                        "msr": [
                            {
                                "val": 10,      // actual
                                "var1": 0,      // since previous analysis
                                "var2": -2,     // since 30 days
                                "var3": 4      // since previous version
                            }
                        ]
                    }
                ];
                return [200, resources, {}];
            });

        // sonar coverage
        $httpBackend.whenGET(/sonar\/api\/resources\?includetrends=true&metrics=coverage&resource=(.*)/, undefined, ['project'])
            .respond(function(method, url, data) {
                var resources = [
                    {
                        "date": (new Date()).getTime() - 100000000,
                        "msr": [
                            {
                                "val": 22.9,    // actual
                                "var1": 0.0,    // since previous analysis
                                "var2": -0.4,   // since 30 days
                                "var3": +1.3    // since previous version
                            }
                        ]
                    }
                ];
                return [200, resources, {}];
            });

        // sonar quality gate details project1
        $httpBackend.whenGET(/sonar\/api\/resources\?metrics=quality_gate_details&resource=com:project1/)
            .respond(function(method, url, data) {
                var resources = [
                    {
                        "msr": [
                            {
                                "data": JSON.stringify({
                                    "level": "OK",
                                    "conditions": ""
                                })
                            }
                        ]
                    }
                ];
                return [200, resources, {}];
        });

        // sonar quality gate details project2
        $httpBackend.whenGET(/sonar\/api\/resources\?metrics=quality_gate_details&resource=com:project2/)
            .respond(function(method, url, data) {
                var resources = [
                    {
                        "msr": [
                            {
                                "data": JSON.stringify({
                                    "level": "WARN",
                                    "conditions": ""
                                })
                            }
                        ]
                    }
                ];
                return [200, resources, {}];
            });

        // sonar quality gate details project3
        $httpBackend.whenGET(/sonar\/api\/resources\?metrics=quality_gate_details&resource=com:project3/)
            .respond(function(method, url, data) {
                var resources = [
                    {
                        "msr": [
                            {
                                "data": JSON.stringify({
                                    "level": "ERROR",
                                    "conditions": [
                                        {
                                            "metric": "coverage",
                                            "level": "ERROR"
                                        },
                                        {
                                            "metric": "class_complexity",
                                            "level": "WARN"
                                        },
                                        {
                                            "metric": "duplicated_lines_density",
                                            "level": "ERROR"
                                        }
                                    ]
                                })
                            }
                        ]
                    }
                ];
                return [200, resources, {}];
            });

        // sonar project
        $httpBackend.whenGET(/sonar\/api\/projects\/index\?format=json&key=com:project1/)
            .respond(function(method, url, data) {
                var response = [
                    {
                        "nm": "Project-1"
                    }
                ];
                return [200, response, {}];
            });

        // sonar users
        $httpBackend.whenGET(/sonar\/api\/users\/search/)
            .respond(function(method, url, data) {
                var response = {
                    "users": [
                        {
                            "login": "admin",
                            "name": "Administrator",
                            "active": true
                        },
                        {
                            "login": "doe",
                            "name": "John Doe",
                            "active": true
                        },
                        {
                            "login": "doe2",
                            "name": "Jane Doe",
                            "active": true
                        },
                        {
                            "login": "doe3",
                            "name": "Jake Doe",
                            "active": false
                        }
                    ]
                };
                return [200, response, {}];
            });

        // sonar issues for user john doe
        $httpBackend.whenGET(/sonar\/api\/issues\/search\?assignees=doe&facets=severities&hideRules=true&projectKeys=(.*)&resolved=false/, undefined, ['user','project'])
            .respond(function(method, url, data) {
                var response = {
                    "total": 100,
                    "facets": [
                        {
                            "property": "severities",
                            "values": [
                                {
                                    "val": "INFO",
                                    "count": 100
                                },
                                {
                                    "val": "MAJOR",
                                    "count": 10
                                },
                                {
                                    "val": "BLOCKER",
                                    "count": 1
                                }
                            ]
                        }
                    ]
                };
                return [200, response, {}];
            });

        // sonar issues for other users
        $httpBackend.whenGET(/sonar\/api\/issues\/search\?assignees=(.*)&facets=severities&hideRules=true&projectKeys=(.*)&resolved=false/, undefined, ['user','project'])
            .respond(function(method, url, data) {
                var response = {
                    "total": 100,
                    "facets": [
                        {
                            "property": "severities",
                            "values": [
                                {
                                    "val": "MINOR",
                                    "count": 1
                                },
                                {
                                    "val": "CRITICAL",
                                    "count": 0
                                },
                                {
                                    "val": "BLOCKER",
                                    "count": 0
                                }
                            ]
                        }
                    ]
                };
                return [200, response, {}];
            });

        //sonar new issues last 7 days
        $httpBackend.whenGET(/sonar\/api\/issues\/search\?assigned=false&createdAfter=(.*)&facets=severities&hideRules=true&projectKeys=(.*)/, undefined, ['date','project'])
            .respond(function(method, url, data) {
                var response = {
                    "total": 1000,
                    "facets": [
                        {
                            "property": "severities",
                            "values": [
                                {
                                    "val": "INFO",
                                    "count": 20
                                },
                                {
                                    "val": "MINOR",
                                    "count": 10
                                },
                                {
                                    "val": "MAJOR",
                                    "count": 5
                                },
                                {
                                    "val": "CRITICAL",
                                    "count": 1
                                },
                                {
                                    "val": "BLOCKER",
                                    "count": 0
                                }
                            ]
                        }
                    ],
                    "issues": [
                        {
                            "key": "070a8e18-9e11-46b8-8ef8-cf8507fb368b",
                            "severity": "BLOCKER",
                            "component": "com:project1:src/main/java/TestSearch.java"
                        },
                        {
                            "key": "070a8e18-9e11-46b8-8ef8-cf8507fb368b",
                            "severity": "BLOCKER",
                            "component": "com:project1:src/main/java/TestSearch.java"
                        },
                        {
                            "key": "070a8e18-9e11-46b8-8ef8-cf8507fb368b",
                            "severity": "BLOCKER",
                            "component": "com:project1:src/main/java/TestSearch.java"
                        }
                    ]
                };
                return [200, response, {}];
            });


    });
