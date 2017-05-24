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
    .factory('dateService', [function () {

        // Service logic
        var TAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        var TODAY = "Heute";
        var _today = new Date();
        _today.setHours(0);
        _today.setMinutes(0);
        _today.setSeconds(0);
        _today.setMilliseconds(0);

        var _sameDay = function (d1, d2) {
            return d1.getFullYear() === d2.getFullYear()
                && d2.getMonth() === d2.getMonth()
                && d1.getDate() === d2.getDate();
        };

        var _dateForWeekday = function (today, weekday) {
            var distance, currentDay, result;
            currentDay = today.getDay();
            distance = weekday - currentDay;
            result = new Date(today.getTime());
            result.setDate(today.getDate() + distance);
            return result;
        };

        var _labelForWeekday = function (today, weekday) {
            var weekdayDate = _dateForWeekday(today, weekday);
            if (_sameDay(weekdayDate, today)) {
                return TODAY;
            } else {
                return TAGE[weekday];
            }
        };

        // Public API here
        return {
            today: _today,
            sameDay: function (d1, d2) {
                return _sameDay(d1, d2);
            },
            dateForWeekday: function (weekday) {
                return _dateForWeekday(this.today, weekday);
            },
            labelForWeekday: function (weekday) {
                return _labelForWeekday(this.today, weekday);
            }
        }
    }]);
