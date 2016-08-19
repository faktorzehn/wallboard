'use strict';

describe('Filter: buildHealth', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var buildHealth;
    beforeEach(inject(function ($filter) {
        buildHealth = $filter('buildHealth');
    }));

    it('should return empty string if input is not a number', function () {
        var text = "text";
        expect(buildHealth(text)).toBe('');
    });



    it('should return very bad if input is <=20', function () {
        var value1 = -1,value2= 0,value3=20;
        expect(buildHealth(value1)).toBe('very-bad');
        expect(buildHealth(value2)).toBe('very-bad');
        expect(buildHealth(value3)).toBe('very-bad');
    });

    it('should return bad if input > 20 && input <= 40', function () {
        var value1 = 21,value2= 40;
        expect(buildHealth(value1)).toBe('bad');
        expect(buildHealth(value2)).toBe('bad');

    });

    it('should return not-bad if input > 40 && input <= 60', function () {
        var value1 = 41,value2= 60;
        expect(buildHealth(value1)).toBe('not-bad');
        expect(buildHealth(value2)).toBe('not-bad');

    });

    it('should return good if input > 60 && input <= 80', function () {
        var value1 = 61,value2= 80;
        expect(buildHealth(value1)).toBe('good');
        expect(buildHealth(value2)).toBe('good');

    });

    it('should return very good if input > 80', function () {
        var value1 = 81,value2= 100;
        expect(buildHealth(value1)).toBe('very-good');
        expect(buildHealth(value2)).toBe('very-good');

    });


});


