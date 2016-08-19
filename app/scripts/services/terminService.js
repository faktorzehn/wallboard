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
    .factory('terminService', function ($resource, dateService) {

        // Service logic
        var _backendUrl;

        _backendUrl = 'termin-db/';


        // Public API here
        return {
            "all": $resource(_backendUrl + 'all.json', {}, {
                query: {method: 'GET', isArray: true}
            }),
            "termin": function (terminId) {
                return $resource(_backendUrl + ':id.json', {}, {
                    query: {method: 'GET', params: {"id": terminId}, isArray: true}
                })
            }
        };
    });
