'use strict';

angular.module('s2n.version', [
  's2n.version.interpolate-filter',
  's2n.version.version-directive'
])

.value('version', '0.1');
