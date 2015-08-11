(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchCtrl', SearchController);

  SearchController.$inject = ['findApi'];

  function SearchController(findApi) {
    var vm = this;
    vm.dataAPI = null;

    vm.title = 'Introduce la URL de tu API';

    vm.fields = null;
    vm.listFields = null;

    ////////

    vm.find = function(url) {
      vm.fields = vm.listFields.replace(/ /g,'').split(',');

      return findApi.getApi(url).then(function(data) {
        vm.dataAPI = data.data;
      });
    };

  }

}());
