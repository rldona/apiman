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
    vm.errorData = {};
    vm.itemsPost = [];

    $scope.$watch('vm.url', function() {
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
            vm.fields = data.data[0] ? Object.getOwnPropertyNames(data.data[0]) : null;
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

    vm.removeItem = function() {
      vm.itemsPost.pop();
    };

    vm.postData = function(obj) {
      var newObj = {};

      for(var i=0, size = vm.itemsPost.length; i < size; i++) {
          newObj[vm.itemsPost[i].key] = vm.itemsPost[i].value;
      }

      obj = obj || newObj;

      return findApi.postData(vm.url, obj).then(function(data) {
        if(vm.showResult) {
          return findApi.getData(vm.url).then(function(data) {
            vm.dataAPI = data.data;
            vm.fields = data.data[0] ? Object.getOwnPropertyNames(data.data[0]) : null;
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
          vm.fields = data.data[0] ? Object.getOwnPropertyNames(data.data[0]) : null;
          vm.showAdd = vm.dataAPI.length ? true : false;
        });
      });
    };

    vm.updateData = function(data) {
      return findApi.updateData(vm.url + data._id, data).then(function(data) {
        return findApi.getData(vm.url).then(function(data) {
          vm.dataAPI = data.data;
          vm.fields = data.data[0] ? Object.getOwnPropertyNames(data.data[0]) : null;
        });
      });
    };

  }

}());
