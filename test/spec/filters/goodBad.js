'use strict';

describe('Filter: goodBad', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var goodBad;
    beforeEach(inject(function ($filter) {
        goodBad = $filter('goodBad');
    }));

    it('should return empty sting if input is not a number', function () {
        var notDefined=null, notNumber = 'x',numberText = '1';
        expect(goodBad(notDefined)).toBe('');
        expect(goodBad(notNumber)).toBe('');
        expect(goodBad(numberText)).toBe('');
    });

    it('should return good if input is < 0', function () {
        var number = -1;
        expect(goodBad(number)).toBe('good');
    });

    it('should return bad if input is > 0', function () {
        var number = 1;
        expect(goodBad(number)).toBe('bad');
    });

    it('should return neutral if input is 0', function () {
        var number = 0;
        expect(goodBad(number)).toBe('neutral');
    });

});
