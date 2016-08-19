'use strict';

describe('Filter: sign', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var sign;
    beforeEach(inject(function ($filter) {
        sign = $filter('sign');
    }));

    it('should return the input if input is not a number"', function () {
        var notANumber = 'angularjs',
            notDefinde=null;

        expect(sign(notANumber)).toBe(notANumber);
        expect(sign(notDefinde)).toBe(notDefinde);
    });


    it('should return the input if input is negative number"', function () {
        var negativeNumberText = '-1',
            negativeNumber = -1;

        expect(sign(negativeNumberText)).toBe(negativeNumberText);
        expect(sign(negativeNumber)).toBe(negativeNumber);
    });

    it('should return the input with + if input is positive number"', function () {
        var numberText = 1,
            number = 1;
        expect(sign(number)).toBe('+1');
    });

});
