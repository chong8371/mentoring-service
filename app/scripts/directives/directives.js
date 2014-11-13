'use strict';

/* Directives */


angular.module('mentoringServiceApp').
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
