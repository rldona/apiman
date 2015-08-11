(function() {
  'use strict';

  angular
    .module('core.services')
    .factory('findApi', findApi);

  findApi.$inject = ['$http'];

  function findApi($http) {

    return {
      get : get,
      post: post
    };

    ////////

    function get(url) {
      return $http.get(url);
    }

    function post(url, data) {
      return $http.post(url, data);
    }

  }

}());
