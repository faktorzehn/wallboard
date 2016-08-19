'use strict';

describe('Service: dateService', function () {

    // load the service's module
    beforeEach(module('wallboardApp'));

    // instantiate service
    var dateService;
    beforeEach(inject(function (_dateService_) {
        dateService = _dateService_;
    }));

    it('should have today date with time set to 00:00:00.000', function () {
        var today = new Date();
        expect(dateService.today.getFullYear()).toBe(today.getFullYear());
        expect(dateService.today.getMonth()).toBe(today.getMonth());
        expect(dateService.today.getDate()).toBe(today.getDate());
        expect(dateService.today.getHours()).toBe(0);
        expect(dateService.today.getMinutes()).toBe(0);
        expect(dateService.today.getSeconds()).toBe(0);
        expect(dateService.today.getMilliseconds()).toBe(0);
    });

    it('should return "Heute" as the label for today', function () {
        var today = new Date();
        expect(dateService.labelForWeekday(today.getDay())).toBe('Heute');
    });

    it('should return not "Heute" as the label for a day other than today', function () {
        var today = new Date();
        expect(dateService.labelForWeekday((today.getDay() + 1)) % 7).not.toBe('Heute');
    });

    it('should correctly compare two dates ignoring the time', function () {
        var date1 = new Date(2013, 6, 27, 14, 6, 30, 0);   // 28.07.2013 15:07:31.000
        var date2 = new Date(2013, 6, 27, 14, 8, 45, 120); // 28.07.2013 15:09:46.120
        var date3 = new Date(2013, 6, 28, 14, 8, 45, 120); // 29.07.2013 15:09:46.120
        expect(dateService.sameDay(date1, date2)).toBeTruthy();
        expect(dateService.sameDay(date2, date1)).toBeTruthy();

        expect(dateService.sameDay(date2, date3)).toBeFalsy();
        expect(dateService.sameDay(date3, date2)).toBeFalsy();
    });
});
