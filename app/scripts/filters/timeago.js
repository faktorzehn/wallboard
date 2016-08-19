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

angular.module('wallboardApp').
filter('timeago', function () {
    return function (date) {
        var dateString = moment(date).fromNow();
        var dateArray = dateString.split(' ');

        if (dateArray[1] == 'few') {
            dateArray[2] = dateArray[2].substring(0, 1);
        } else {
            dateArray[1] = dateArray[1].substring(0, 1);
        }

        var output = '';
        for (var i = 0; i < dateArray.length; i++) {
            if (i == dateArray.length - 1) {
                output += dateArray[i];
            } else {
                output += dateArray[i] + ' ';
            }

        }
        return output;
    }
});


