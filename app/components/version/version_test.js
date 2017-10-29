'use strict';

describe('s2n.version module', function() {
  beforeEach(module('s2n.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
