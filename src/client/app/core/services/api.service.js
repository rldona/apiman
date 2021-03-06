(function() {
  'use strict';

  angular
    .module('core.services')
    .factory('findApi', findApi);

  findApi.$inject = ['$http'];

  function findApi($http) {

    return {
      getData : getData,
      postData: postData,
      deleteData: deleteData,
      updateData: updateData
    };

    ////////

    function getData(url) {
      return $http.get(url);
    }

    function postData(url, data) {
      return $http.post(url, data);
    }

    function deleteData(url) {
      return $http.delete(url);
    }

    function updateData(url, data) {
      return $http.put(url, data);
    }

  }

}());
