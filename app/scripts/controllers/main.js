'use strict';

/**
 * @ngdoc function
 * @name mentoringServiceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mentoringServiceApp
 */
angular.module('mentoringServiceApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
