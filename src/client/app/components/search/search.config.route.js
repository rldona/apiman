(function() {
  'use strict';

  console.log('search');

  angular.module('app.search', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/search', {
      templateUrl: '/app/components/search/search.html',
      controller: 'SearchCtrl'
    });

  }]);

}());
