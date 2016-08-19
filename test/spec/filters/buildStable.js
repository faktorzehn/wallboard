'use strict';

describe('Filter: buildStable', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var buildStable;
    beforeEach(inject(function ($filter) {
        buildStable = $filter('buildStable');
    }));

    it('should return info if input is not UNSTABLE, FAILURE or SUCCESS', function () {
        var text = 'angularjs', notDefined = null;
        expect(buildStable(text)).toBe('info');
        expect(buildStable(notDefined)).toBe('info');
    });


    it('should return warning if input is UNSTABLE', function () {
        var text = 'UNSTABLE';
        expect(buildStable(text)).toBe('warning');

    });

    it('should return danger if input is FAILURE', function () {
        var text = 'FAILURE';
        expect(buildStable(text)).toBe('danger');

    });

    it('should return success if input is SUCCESS', function () {
        var text = 'SUCCESS';
        expect(buildStable(text)).toBe('success');

    });

});
