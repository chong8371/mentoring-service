'use strict';

/**
 * @ngdoc function
 * @name mentoringServiceApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mentoringServiceApp
 */
angular.module('mentoringServiceApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
