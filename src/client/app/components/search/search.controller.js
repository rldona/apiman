(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchCtrl', SearchController);

  SearchController.$inject = ['findApi'];

  function SearchController(findApi) {
    var vm = this;
    vm.dataAPI = null;
    vm.fields = null;

    vm.testArray = ['name', 'sku', 'price'];

    vm.newItem = {};

    ////////

    vm.find = function(url) {
      return findApi.get(url).then(function(data) {
        vm.dataAPI = data.data;
        vm.fields = Object.getOwnPropertyNames(data.data[0]);
      });
    };

    vm.post = function(item) {
      return findApi.post(vm.url, item).then(function(data) {
        console.log(data);
      });
    };

  }

}());
