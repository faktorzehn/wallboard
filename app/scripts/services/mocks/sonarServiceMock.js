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
    .run(function ($httpBackend) {

        // sonar blocker
        $httpBackend.whenGET(/sonar\/api\/measures\/component\?additionalFields=metrics,periods&componentKey=(.*)&metricKeys=blocker_violations/, undefined, ['project'])
            .respond(function (method, url, data) {
                var response = {
                    "component": {
                        "id": "AVrMDmx1JB_TCvy6K-vn",
                        "key": "at.wrwks.pipe.pbarchiv:parent:continuous",
                        "name": "pipe.pbarchiv continuous",
                        "description": "parent pom for all new pipe projects (java 8, spring-boot)",
                        "qualifier": "TRK",
                        "measures": [{
                            "metric": "blocker_violations",
                            "value": "5",
                            "periods": [{"index": 1, "value": "5"}]
                        }],
                        "metrics": [{
                            "key": "open_issues",
                            "name": "Open Issues",
                            "description": "Open issues",
                            "domain": "Issues",
                            "type": "INT",
                            "higherValuesAreBetter": false,
                            "qualitative": false,
                            "hidden": false,
                            "custom": false,
                            "bestValue": "0"
                        }]
                    }
                };
                return [200, response, {}];
            });

        // sonar minor
        $httpBackend.whenGET(/sonar\/api\/measures\/component\?additionalFields=metrics,periods&componentKey=(.*)&metricKeys=minor_violations/, undefined, ['project'])
            .respond(function (method, url, data) {
                var response = {
                        "component": {
                            "measures": [{
                                "metric": "minor_violations",
                                "value": "5",
                                "periods": [{"index": 1, "value": "-1"}]
                            }],
                            "metrics": [{
                                "key": "minor_issues",
                                "name": "Minor Issues",
                                "description": "Minor issues",
                                "domain": "Issues",
                                "type": "INT",
                                "higherValuesAreBetter": false,
                                "qualitative": false,
                                "hidden": false,
                                "custom": false,
                                "bestValue": "0"
                            }]
                        }
                    }
                ;
                return [200, response, {}];
            });

        // sonar coverage
        $httpBackend.whenGET(/sonar\/api\/measures\/component\?additionalFields=metrics,periods&componentKey=(.*)&metricKeys=coverage/, undefined, ['project'])
            .respond(function (method, url, data) {
                var response = {
                    "component": {
                        "measures": [{
                            "metric": "coverage",
                            "value": "66.0",
                            "periods": [{"index": 1, "value": "17.0"}]
                        }],
                        "metrics": [{
                            "key": "coverage",
                            "name": "Coverage",
                            "description": "Coverage by tests",
                            "domain": "Coverage",
                            "type": "PERCENT",
                            "higherValuesAreBetter": true,
                            "qualitative": true,
                            "hidden": false,
                            "custom": false,
                            "decimalScale": 1,
                            "bestValue": "100.0",
                            "worstValue": "0.0"
                        }]
                    }
                };
                return [200, response, {}];
            });

        // sonar quality gate details project1
        $httpBackend.whenGET(/sonar\/api\/measures\/component\?componentKey=com:project1&metricKeys=quality_gate_details/)
            .respond(function (method, url, data) {
                var response = {
                    "component": {
                        "measures": [{
                            "metric": "quality_gate_details",
                            "value": JSON.stringify({
                                "level": "OK",
                                "conditions": ""
                            })
                        }]
                    }
                };
                return [200, response, {}];
            });

        // sonar quality gate details project2
        $httpBackend.whenGET(/sonar\/api\/measures\/component\?componentKey=com:project2&metricKeys=quality_gate_details/)
            .respond(function (method, url, data) {
                var response = {
                    "component": {
                        "measures": [{
                            "metric": "quality_gate_details",
                            "value": JSON.stringify({
                                "level": "WARN",
                                "conditions": [{
                                    "metric": "test_errors",
                                    "op": "GT",
                                    "warning": "",
                                    "error": "0",
                                    "actual": "1",
                                    "level": "WARN"
                                }]
                            })
                        }]
                    }
                };
                return [200, response, {}];
            });

        // sonar quality gate details project3
        $httpBackend.whenGET(/sonar\/api\/measures\/component\?componentKey=com:project3&metricKeys=quality_gate_details/)
            .respond(function (method, url, data) {
                var response = {
                        "component": {
                            "measures": [{
                                "metric": "quality_gate_details",
                                "value": JSON.stringify({
                                    "level": "ERROR",
                                    "conditions": [{
                                        "metric": "test_errors",
                                        "op": "GT",
                                        "warning": "",
                                        "error": "0",
                                        "actual": "0",
                                        "level": "OK"
                                    }, {
                                        "metric": "test_failures",
                                        "op": "GT",
                                        "warning": "",
                                        "error": "0",
                                        "actual": "0",
                                        "level": "OK"
                                    }, {
                                        "metric": "skipped_tests",
                                        "op": "GT",
                                        "period": 1,
                                        "warning": "0",
                                        "error": "",
                                        "actual": "0",
                                        "level": "OK"
                                    }, {
                                        "metric": "coverage",
                                        "op": "LT",
                                        "period": 1,
                                        "warning": "",
                                        "error": "0",
                                        "actual": "17.0",
                                        "level": "OK"
                                    }, {
                                        "metric": "violations",
                                        "op": "GT",
                                        "warning": "",
                                        "error": "0",
                                        "actual": "125",
                                        "level": "ERROR"
                                    }, {
                                        "metric": "new_coverage",
                                        "op": "LT",
                                        "period": 1,
                                        "warning": "",
                                        "error": "50",
                                        "actual": "61.801016702977485",
                                        "level": "OK"
                                    }, {
                                        "metric": "package-dependency-cycles",
                                        "op": "GT",
                                        "period": 1,
                                        "warning": "",
                                        "error": "0",
                                        "actual": "0",
                                        "level": "OK"
                                    }]
                                })
                            }]
                        }
                    }
                ;
                return [200, response, {}];
            });

        // sonar project
        $httpBackend.whenGET(/sonar\/api\/projects\/index\?format=json&key=com:project1/)
            .respond(function (method, url, data) {
                var response = [
                    {
                        "nm": "Project-1"
                    }
                ];
                return [200, response, {}];
            });

        // sonar users
        $httpBackend.whenGET(/sonar\/api\/users\/search/)
            .respond(function (method, url, data) {
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
        $httpBackend.whenGET(/sonar\/api\/issues\/search\?assignees=doe&facets=severities&hideRules=true&projectKeys=(.*)&resolved=false/, undefined, ['user', 'project'])
            .respond(function (method, url, data) {
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
        $httpBackend.whenGET(/sonar\/api\/issues\/search\?assignees=(.*)&facets=severities&hideRules=true&projectKeys=(.*)&resolved=false/, undefined, ['user', 'project'])
            .respond(function (method, url, data) {
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
        $httpBackend.whenGET(/sonar\/api\/issues\/search\?assigned=false&createdAfter=(.*)&facets=severities&hideRules=true&projectKeys=(.*)/, undefined, ['date', 'project'])
            .respond(function (method, url, data) {
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
