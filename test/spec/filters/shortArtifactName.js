'use strict';

describe('Filter: shortArtifactName', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var shortArtifactName;
    beforeEach(inject(function ($filter) {
        shortArtifactName = $filter('shortArtifactName');
    }));

    it('should return the short artifact name from the input url"', function () {
        var text = 'com.company:ui:src/test/java/com/company/FooComponentTest.java';
        expect(shortArtifactName(text)).toBe('ui/.../FooComponentTest.java');
    });

    it('should return the short artifact name from the input url"', function () {
        var text = 'com.company:ui:continuous:src/test/java/com/company/ui/package/FooComponentTest.java';
        expect(shortArtifactName(text)).toBe('ui/.../FooComponentTest.java');
    });

});
