'use strict';

describe('Service: terminService', function () {

    // load the service's module
    beforeEach(module('wallboardApp'));

    // instantiate service
    var terminService, $httpBackend;
    beforeEach(inject(function (_$httpBackend_, _terminService_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('termin-db/all.json').
            respond([
                {"id": "1"},
                {"id": "2"}
            ]);
        terminService = _terminService_;
    }));

    it('should expose functions', function () {
        expect(terminService.termin).not.toBeNull();
        expect(terminService.all).not.toBeNull();
    });

});
