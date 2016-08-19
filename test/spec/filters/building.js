'use strict';

describe('Filter: building', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var building;
    beforeEach(inject(function ($filter) {
        building = $filter('building');
    }));

    it('should return empty string if input is not defined', function () {
        var text = null;
        expect(building(text)).toBe('');
    });

    it('should return empty string if input is not true', function () {
        var text = "xx", textFalse = 'false', textTrue = 'true', value = false;

        expect(building(text)).toBe('');
        expect(building(textFalse)).toBe('');
        expect(building(textTrue)).toBe('');
        expect(building(value)).toBe('');

    });

    it('should return active if input is true', function () {
        var value = true;
        expect(building(value)).toBe('active');

    });

});
