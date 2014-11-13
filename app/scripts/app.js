'use strict';

/**
 * @ngdoc overview
 * @name mentoringServiceApp
 * @description
 * # mentoringServiceApp
 *
 * Main module of the application.
 */

Parse.initialize('x1HSEj3pjh8Gnk7JFQABUk3nZqmsuvI8qUkzUKwU', 'cbZvbrSql2DiMM0apXDerpUOaM59esQuHEbEmbNe');

angular
  .module('mentoringServiceApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'parse-angular',
    'parse-angular.enhance'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })

      .when('/users', {templateUrl: 'views/partials/users.html', controller: 'usersCtrl'})
      .when('/user/:id', {templateUrl: 'views/partials/user.html', controller: 'userCtrl'})

      .otherwise({
        redirectTo: '/'
      });


  });
