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
    vm.errorData = {};
    // guardar URL en sessionStorage()

    $scope.$watch('vm.url', function() {
      vm.showResult = false;
      vm.errorData.show = false;
      vm.errorData = {};
    });

    ////////

    vm.getData = function() {
      if(vm.url) {
        sessionStorage.setItem('url', vm.url);

        return findApi.getData(vm.url).then(function(data) {
          console.log(data);
          if (data.length > 0) {
            vm.dataAPI = data.data;
            vm.fields = Object.getOwnPropertyNames(data.data[0]);
          }

          // show section
          vm.showResult = true;

        }, function(error) {
          console.log(error);
          vm.errorData.method = error.config.method;
          vm.errorData.message = error.data;
          vm.errorData.status = error.status;
          vm.errorData.show = true;
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

          if(vm.dataAPI.length === 0) {
            vm.showAdd = true;
          }

        });
      });
    };

    vm.updateData = function(data) {
      return findApi.updateData(vm.url + data._id, data).then(function(data) {
        return findApi.getData(vm.url).then(function(data) {
          vm.dataAPI = data.data;
          vm.fields = Object.getOwnPropertyNames(data.data[0]);
        });
      });
    };

  }

}());
