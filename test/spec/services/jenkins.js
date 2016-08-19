'use strict';

describe('Service: jenkins', function () {

  // load the service's module
  beforeEach(module('wallboardApp'));

  // instantiate service
  var jenkins;
  beforeEach(inject(function (_jenkins_) {
    jenkins = _jenkins_;
  }));

  it('should do something', function () {
    //expect(!!jenkins).toBe(true);
  });

});
