'use strict';

describe('Controller: TermineCtrl', function () {

    // load the controller's module
    beforeEach(module('wallboardApp'));

    // Heute Datum soll Dienstag der 23.07.2013 sein
    var TODAY = new Date(2013,6, 23);

    var TermineCtrl, scope, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _dateService_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('termin-db/all.json').respond([
            {"id": "1"},
            {"id": "2"}
        ]);

        // Heute-Datum im DateService auf den 23.07.2013 setzen
        _dateService_.today = TODAY;
        scope = $rootScope.$new();
        TermineCtrl = $controller('TermineCtrl', {$scope: scope});
    }));

    it('should set termine to the scope', function () {
        expect(scope.termine).not.toBeUndefined();
        $httpBackend.flush();
        expect(scope.termine).not.toBeUndefined();
        expect(scope.termine.length).toBe(2);
        expect(scope.termine[0].id).toBe("1");
    });

    it('should set weekdays to the scope', function () {
        // "Heute" ist Dienstag der 23.07.2013. Montag muss also der 22.07.2013 sein
        expect(scope.tage.montag.datum.getDay()).toBe(1);
        expect(scope.tage.montag.datum.getFullYear()).toBe(2013);
        expect(scope.tage.montag.datum.getMonth()).toBe(6);
        expect(scope.tage.montag.datum.getDate()).toBe(22);

        expect(scope.tage.dienstag.datum.getDay()).toBe(2);
        expect(scope.tage.mittwoch.datum.getDay()).toBe(3);
        expect(scope.tage.donnerstag.datum.getDay()).toBe(4);
        expect(scope.tage.freitag.datum.getDay()).toBe(5);
    });

    it('should have "Heute" as the label for today', function () {
        expect(scope.tage.dienstag.label).toBe("Heute");
    });

    it('should have "Montag" as the label for monday', function () {
        expect(scope.tage.montag.label).toBe("Montag");
    });
});
