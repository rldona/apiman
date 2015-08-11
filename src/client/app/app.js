(function() {
  'use strict';

  console.log('app');

  angular
    .module('app', [

      // angular modules
      'ngRoute',

      // angular services
      'core.services',

      // app components
      'app.search'

    ])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/search'});
    }]);

}());
