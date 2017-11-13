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
    .controller('MainCtrl', function ($scope, wconfig, $interval, $routeParams, $location) {

        $scope.config = wconfig.getConfig();
        $scope.services = wconfig.getServices();
        $scope.projects = wconfig.getProjects();

        $scope.selectedProject = 0;
        $scope.autorefresh = false;
        $scope.showMenu = true;
        $scope.branding = true;

        if(window.localStorage.getItem('size') === null) {
            window.localStorage.setItem('size', 'normal');
        }

        $scope.size = window.localStorage.getItem('size');

        $scope.setSize = function(size) {
            $scope.size = size;
            window.localStorage.setItem('size', size);
        };

        if (angular.isDefined($scope.config.branding)) {
            $scope.branding = $scope.config.branding;
        }

        function selectNextProject() {
            var index = 0;
            if ($scope.selectedProject != $scope.projects.length - 1) {
                index = $scope.selectedProject + 1;
            }
            $location.path('/project/' + index);
        }

        function selectPreviousProject() {
            var index = $scope.projects.length - 1;
            if ($scope.selectedProject != 0) {
                index = $scope.selectedProject - 1;
            }
            $location.path('/project/' + index);
        }

        var stop = undefined;

        // set default refresh value to 30 seconds
        if (angular.isUndefined($scope.config.refresh)) {
            $scope.config.refresh = 30;
        }

        function startAutorefresh() {
            stop = $interval(function () {
                if ($scope.autorefresh) {
                    selectNextProject();
                }
            }, $scope.config.refresh * 1000);
        }

        function stopAutorefresh() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        }

        var handler = function (e) {
            if (e.keyCode === 39) { //right arrow
                selectNextProject();
            } else if (e.keyCode === 37) { // left arrow
                selectPreviousProject();
            } else if (e.keyCode === 82) { // r
                $scope.autorefresh = !$scope.autorefresh;
            }
        };

        // switch to specific project
        if ($routeParams.projectId != null) {
            $scope.selectedProject = Number($routeParams.projectId);
            $scope.autorefresh = false;
        } else {
            $location.path('/project/0');
        }

        // interval for user inactivity
        var interval = 1;
        $interval(function () {
            if (interval == 5) {
                $scope.showMenu = false;
                interval = 1;
            }
            interval++;
        }, 1000);

        $scope.userActivity = function (e) {
            $scope.showMenu = true;
            interval = 1;
        };

        var $doc = angular.element(document);
        $doc.on('keydown', handler);

        $scope.$on('$destroy', function () {
            stopAutorefresh();
            $doc.off('keydown', handler);
        });

        // start auto refresh
        if ($scope.autorefresh) {
            startAutorefresh();
        }

    });
