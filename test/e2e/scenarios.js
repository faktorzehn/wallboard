'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Wallboard App', function () {

    it('should redirect index.html to index.html#/', function () {
        browser().navigateTo('../../app/index.html');
        expect(browser().location().url()).toBe('/');
    });

    describe('Termine view', function() {

        beforeEach(function() {
            browser().navigateTo('../../app/index.html#/termine');
        });

        it('should display tages termine', function() {
            expect(repeater('#tages-termine > .termin').count()).toBe(2);
        });

        it('should display wochen termine', function() {
            expect(repeater('#wochen-termine > .termin').count()).toBe(1);
        });
    });

});
