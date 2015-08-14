(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchCtrl', SearchController);

  SearchController.$inject = ['$scope', 'findApi', 'utils'];

  function SearchController($scope, findApi, utils) {
    var vm = this;
    vm.url = sessionStorage.getItem('url') || null;
    vm.dataAPI = null;
    vm.fields = null;
    vm.testArray = null;
    vm.newItem = {};
    vm.errorData = {};

    vm.itemsPost = [];

    vm.objFormPost = {
      value: ''
    };

    $scope.$watch('vm.url', function() {
      // vm.showResult = false;
      vm.errorData.show = false;
      vm.errorData = {};
    });

    ////////

    vm.getData = function() {

      if(vm.url) {
        sessionStorage.setItem('url', vm.url);

        return findApi.getData(vm.url).then(function(data) {
          if (data.data.length > 0) {
            vm.dataAPI = data.data;
            vm.fields = Object.getOwnPropertyNames(data.data[0]);
          }

          // show section
          vm.showResult = true;

        }, function(error) {
          vm.showResult = false;
          vm.errorData.method = error.config.method;
          vm.errorData.message = error.data.message || error.data;
          vm.errorData.status = error.status;
          vm.errorData.show = true;
        });
      }

    };

    vm.showPostForm = function() {
      if(vm.postForm) {
        vm.postForm = false;
      } else {
        vm.postForm = true;
      }
    };
    vm.hidePostForm = function() {
      if(vm.postForm) {
        vm.postForm = false;
      }
    };

    vm.addItem = function() {
      vm.itemsPost.push({
        key: '',
        value: ''
      });
    };

    vm.postData = function(obj) {
      return findApi.postData(vm.url, obj).then(function(data) {
        if(vm.showResult) {
          return findApi.getData(vm.url).then(function(data) {
            vm.dataAPI = data.data;
            vm.fields = Object.getOwnPropertyNames(data.data[0]);
          });
        }
      });
    };

    vm.deleteData = function(id, param) {
      var finalURL = null;

      vm.url = utils.formatURL(vm.url);
      finalURL = vm.url + id;

      vm.errorData = {};

      if(param === 'input') {
          finalURL = vm.url;
      }

      return findApi.deleteData(finalURL).then(function(data) {
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
