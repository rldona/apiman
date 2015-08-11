(function() {
  'use strict';

  console.log('findApi');

  angular
    .module('core.services')
    .factory('findApi', findApi);

  findApi.$inject = ['$http'];

  function findApi($http) {

    return {
      getApi : getApi,
    };

    ////////

    function getApi(url) {
      return $http.get(url);
    }

  }

}());
