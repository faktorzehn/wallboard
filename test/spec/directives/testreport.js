'use strict';

describe('Directive: testreport', function () {
    beforeEach(module('wallboardApp'));

    var TestReportController,
        scope, attrs;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, jenkins) {
        jenkins.uri = 'XY';
        attrs={};
        attrs.job = 'testJob';
        attrs.title = 'testTitle';
        jenkins.getBuild = function(a,b){
            return {get:function(c){
                c({number:111,fullDisplayName:'build',timestamp:11});
            }};
        };
        jenkins.getTestReport = function(a,b){
            return {get:function(c){
                c({failCount:10});
            }};
        };
        scope = $rootScope.$new();
        TestReportController = $controller('TestReportController', {
            $scope: scope, $attrs: attrs
        });

        TestReportController.startTimer=function() {

        }
    }));

    it('should load attributes job and title', function () {
        expect(scope.job).toBe('testJob');
        expect(scope.title).toBe('testTitle');
    });

    it('should load last build and last successful build', function () {
        expect(scope.lastSuccessfulBuild.number).toBe(111);
        expect(scope.lastBuild.number).toBe(111);
        expect(scope.lastBuild.fullDisplayName).toBe('build');
        expect(scope.lastSuccessfulBuild.fullDisplayName).toBe('build');

    });

    it('should load test report', function () {
        expect(scope.testReportLastSuccessfulBuild.failCount).toBe(10);

    });


});
