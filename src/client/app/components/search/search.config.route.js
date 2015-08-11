(function() {
  'use strict';

  angular.module('app.search', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
      templateUrl: '/app/components/search/search.html',
      controller: 'SearchCtrl as vm'
    });

  }]);

}());
