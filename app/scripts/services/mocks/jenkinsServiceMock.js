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

        // jenkins job trunk
        $httpBackend.whenGET(/jenkins\/job\/Compile_Trunk\/lastCompletedBuild(\/testReport)?\/api\/json.*/, undefined, ['testReport'])
            .respond(function(method, url, data, headers, params) {
                var buildInfo = {
                    "timestamp": (new Date()).getTime() - 10,
                    "estimatedDuration" : 50,
                    "building" : false,
                    "number": 156778,
                    "url" : "https://build.project.com/jenkins/job/test.project/51/",
                    "result": "UNSTABLE"
                };
                var testReport = {
                    "failCount": 12,
                    "totalCount": 12
                };

                if(!angular.isUndefined(params.testReport)) {
                    return [200, testReport, {}];
                }

                return [200, buildInfo, {}];
            });

        // jenkins job trunk-running
        $httpBackend.whenGET(/jenkins\/job\/Compile_Trunk\/lastBuild(\/testReport)?\/api\/json.*/, undefined, ['testReport'])
            .respond(function(method, url, data, headers, params) {
                var buildInfo = {
                    "failCount": 0,
                    "totalCount": 100,
                    "timestamp": 1488999334089,
                    "estimatedDuration" : 1960652,
                    "building" : true,
                    "number": 31,
                    "result": null,
                    "fullDisplayName" : "test.project #51",
                    "url" : "https://build.project.com/jenkins/job/test.project/51/"
                };
                var testReport = {
                    "failCount": 0,
                    "totalCount": 100
                };

                if(!angular.isUndefined(params.testReport)) {
                    return [200, testReport, {}];
                }

                return [200, buildInfo, {}];
            });

        // jenkins job trunk
        $httpBackend.whenGET(/jenkins\/job\/Compile_Trunk\/lastSuccessfulBuild(\/testReport)?\/api\/json.*/, undefined, ['testReport'])
            .respond(function(method, url, data, headers, params) {
                var buildInfo = {
                    "timestamp": (new Date()).getTime() - 10,
                    "estimatedDuration" : 50,
                    "building" : false,
                    "number": 4678,
                    "url" : "https://build.project.com/jenkins/job/test.project/51/",
                    "result": "UNSTABLE",
                    "culprits": [
                        {
                            "fullName": "John Doe"
                        },
                        {
                            "fullName": "Jane Doe"
                        }
                    ]
                };
                var testReport = {
                    "failCount": 10,
                    "totalCount": 18,
                    "childReports": [
                        {
                            "child": {
                                "url": "foo$module-1/baa"
                            },
                            "result": {
                                "failCount": 12
                            }
                        },
                        {
                            "child": {
                                "url": "foo$module-2/baa"
                            },
                            "result": {
                                "failCount": 24
                            }
                        }
                    ]
                };

                if(!angular.isUndefined(params.testReport)) {
                    return [200, testReport, {}];
                }

                return [200, buildInfo, {}];
            });

        // jenkins job branch
        $httpBackend.whenGET(/jenkins\/job\/Compile_Branch\/last(.*)Build(\/testReport)?\/api\/json.*/, undefined, ['job', 'testReport'])
            .respond(function(method, url, data, headers, params) {
                var buildInfo = {
                    "timestamp": 1477349332089,
                    "estimatedDuration" : 1960652,
                    "building" : false,
                    "number": 432,
                    "url" : "https://build.project.com/jenkins/job/test.project/51/",
                    "result": "SUCCESS",
                    "culprits": [
                        {
                            "fullName": "John Doe"
                        },
                        {
                            "fullName": "Jane Doe"
                        }
                    ]
                };
                var testReport = {
                    "failCount": 0,
                    "totalCount": 100
                };

                if(!angular.isUndefined(params.testReport)) {
                    return [200, testReport, {}];
                }

                return [200, buildInfo, {}];
            });

        // jenkins job branch-2 failed
        $httpBackend.whenGET(/jenkins\/job\/Compile_Branch-2\/last(.*)Build(\/testReport)?\/api\/json.*/, undefined, ['job', 'testReport'])
            .respond(function(method, url, data, headers, params) {
                var buildInfo = {
                    "timestamp": 1477349332089,
                    "estimatedDuration" : 1960652,
                    "building" : false,
                    "number": 51,
                    "result": "FAILURE",
                    "fullDisplayName" : "test.project #51",
                    "url" : "https://build.project.com/jenkins/job/test.project/51/",
                    "culprits": [
                        {
                            "fullName": "John Doe"
                        },
                        {
                            "fullName": "Jane Doe"
                        }
                    ]
                };
                var testReport = {
                    "failCount": 0,
                    "totalCount": 100
                };

                if(!angular.isUndefined(params.testReport)) {
                    return [200, testReport, {}];
                }

                return [200, buildInfo, {}];
            });

        // jenkins job branch-3 aborted
        $httpBackend.whenGET(/jenkins\/job\/Compile_Branch-aborted\/(.*)\/api\/json.*/, undefined, [])
            .respond(function(method, url, data) {
                var build = {
                    "timestamp": 1477349332089,
                    "estimatedDuration" : 1960652,
                    "building" : false,
                    "number": 51,
                    "result": "ABORTED",
                    "fullDisplayName" : "test.project #51",
                    "url" : "https://build.project.com/jenkins/job/test.project/51/",
                    "culprits": [
                        {
                            "fullName": "John Doe"
                        },
                        {
                            "fullName": "Jane Doe"
                        }
                    ]
                };
                return [200, build, {}];
            });

    });
