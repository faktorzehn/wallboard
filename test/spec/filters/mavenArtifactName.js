'use strict';

describe('Filter: mavenArtifactName', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var mavenArtifactName;
    beforeEach(inject(function ($filter) {
        mavenArtifactName = $filter('mavenArtifactName');
    }));

    it('should return the maven artifact name from the input url"', function () {
        var text = 'https://vig-offer.at:443/jenkins/job/Compile%20-%20Trunk/at.biac.offer$at.biac.ides.test/3995/';
        expect(mavenArtifactName(text)).toBe('at.biac.ides.test');
    });

});
