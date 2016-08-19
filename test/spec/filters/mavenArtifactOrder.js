'use strict';

describe('Filter: mavenArtifactOrder', function () {

    // load the filter's module
    beforeEach(module('wallboardApp'));

    // initialize a new instance of the filter before each test
    var mavenArtifactOrder;
    beforeEach(inject(function ($filter) {
        mavenArtifactOrder = $filter('mavenArtifactOrder');
    }));

    it('should return a array of warning sortey by number of warnings"', function () {
        var array = [
            {result: {
                failCount: 1
            }

            } ,
            {result: {
                failCount: 10
            }

            }

        ]
        expect(mavenArtifactOrder(array)[0].result.failCount).toBe(10);
        expect(mavenArtifactOrder(array)[1].result.failCount).toBe(1);
    });

});
