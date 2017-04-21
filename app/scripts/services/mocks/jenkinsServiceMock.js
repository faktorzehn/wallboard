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
        $httpBackend.whenGET(/jenkins\/job\/Compile_Trunk\/(.*)\/api\/json.*/, undefined, ['job','build'])
            .respond(function(method, url, data) {
                var build = {
                    "failCount": 12,
                    "totalCount": 12,
                    "timestamp": (new Date()).getTime() - 10,
                    "estimatedDuration" : 50,
                    "building" : true,
                    "number": 156778,
                    "url": "",
                    "result": "UNSTABLE",
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
                    ],
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

        // jenkins job branch
        $httpBackend.whenGET(/jenkins\/job\/Compile_Branch\/(.*)\/api\/json.*/, undefined, ['job','build'])
            .respond(function(method, url, data) {
                var build = {
                    "failCount": 0,
                    "totalCount": 100,
                    "timestamp": 1477349332089,
                    "estimatedDuration" : 1960652,
                    "building" : false,
                    "number": 432,
                    "url": "",
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
                return [200, build, {}];
            });

        // jenkins job branch-2 failed
        $httpBackend.whenGET(/jenkins\/job\/Compile_Branch-2\/(.*)\/api\/json.*/, undefined, ['job','build'])
            .respond(function(method, url, data) {
                var build = {
                    "failCount": 0,
                    "totalCount": 100,
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
                return [200, build, {}];
            });

    });
