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
    .controller('TermineCtrl', function ($scope, terminService, dateService) {

        $scope.termine = terminService.all.query();
        $scope.tage = {
            montag: {datum: dateService.dateForWeekday(1), label: dateService.labelForWeekday(1)},
            dienstag: {datum: dateService.dateForWeekday(2), label: dateService.labelForWeekday(2)},
            mittwoch: {datum: dateService.dateForWeekday(3), label: dateService.labelForWeekday(3)},
            donnerstag: {datum: dateService.dateForWeekday(4), label: dateService.labelForWeekday(4)},
            freitag: {datum: dateService.dateForWeekday(5), label: dateService.labelForWeekday(5)}
        };
    });
