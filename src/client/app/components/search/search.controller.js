(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchCtrl', SearchController);

  SearchController.$inject = ['$scope', 'findApi'];

  function SearchController($scope, findApi) {
    var vm = this;
    vm.url = sessionStorage.getItem('url') || null;
    vm.dataAPI = null;
    vm.fields = null;
    vm.testArray = null;
    vm.newItem = {};

    // guardar URL en sessionStorage()

    $scope.$watch('vm.url', function() {
      if(vm.url) {

        sessionStorage.setItem('url', vm.url);

        return findApi.getData(vm.url).then(function(data) {
          vm.dataAPI = data.data;
          vm.fields = Object.getOwnPropertyNames(data.data[0]);

          // show section
          vm.showAdd = true;
        });
      }
    });

    ////////

    vm.getData = function() {
      if(vm.url) {

        vm.showSearch = true;

        return findApi.getData(vm.url).then(function(data) {
          // vm.dataAPI = data.data;
          // vm.fields = Object.getOwnPropertyNames(data.data[0]);

          // show section
          // vm.showSearch = true;
        });
      }
    };

    vm.postData = function(item) {
      return findApi.postData(vm.url, item).then(function(data) {
        if(vm.showAdd) {
          return findApi.getData(vm.url).then(function(data) {
            vm.dataAPI = data.data;
            vm.fields = Object.getOwnPropertyNames(data.data[0]);
          });
        }
      });
    };

    vm.deleteData = function(id) {
      return findApi.deleteData(vm.url + id).then(function(data) {
        return findApi.getData(vm.url).then(function(data) {
          vm.dataAPI = data.data;
          vm.fields = Object.getOwnPropertyNames(data.data[0]);
        });
      });
    };

  }

}());
